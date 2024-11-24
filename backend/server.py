import shutil
import zipfile
from fastapi import FastAPI, Form, UploadFile, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import subprocess
import sys
from typing import Union
from yt_dlp import YoutubeDL
from pydub import AudioSegment

# Windows-specific fix for connection reset error
if sys.platform.startswith("win"):
    import asyncio

    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to MuseScore for converting MIDI to PDF
MUSESCORE_PATH = r"C:\Program Files\MuseScore 3\bin\MuseScore3.exe"
MIDI_IMPORT_OPTIONS = "midi_import_options_0.xml"  # Adjust to your settings

# Your existing directories setup
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Rest of your existing code remains the same...


@app.post("/process/")
async def process_file(
    input_file: Union[UploadFile, None] = None,
    youtube_url: Union[str, None] = Form(default=None),
):
    """
    Processes an input file or URL and returns a PDF file.
    The input can be:
    - A YouTube URL (via `youtube_url` form field)
    - An uploaded audio file (.wav or .mp3) (via `input_file` upload)
    """
    
    # Step -1: Clean up files after sending response
    for filename in os.listdir(OUTPUT_DIR):
        file_path = os.path.join(OUTPUT_DIR, filename)
        if filename == "output.pdf":
            continue
        if filename.endswith(".zip"):
            continue
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print("Failed to delete %s. Reason: %s" % (file_path, e))
    for filename in os.listdir(UPLOAD_DIR):
        file_path = os.path.join(UPLOAD_DIR, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print("Failed to delete %s. Reason: %s" % (file_path, e))

    if not youtube_url and not input_file:
        raise HTTPException(
            status_code=400, detail="Either youtube_url or input_file must be provided"
        )

    wav_file_path = os.path.join(UPLOAD_DIR, "processed.wav")
    files_to_cleanup = []  # Keep track of all files we create

    try:
        # Step 1: Handle the input
        if youtube_url:  # YouTube URL provided
            ydl_opts = {
                "format": "bestaudio/best",
                "outtmpl": os.path.join(UPLOAD_DIR, "%(title)s.%(ext)s"),
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "wav",
                        "preferredquality": "192",
                    }
                ],
            }
            try:
                with YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(youtube_url, download=True)
                    wav_file_path = ydl.prepare_filename(info).replace(
                        info["ext"], "wav"
                    )
                    files_to_cleanup.append(wav_file_path)
            except Exception as e:
                raise HTTPException(
                    status_code=400, detail=f"YouTube download failed: {e}"
                )

        elif input_file:  # File upload provided
            file_extension = os.path.splitext(input_file.filename)[-1].lower()
            upload_path = os.path.join(UPLOAD_DIR, f"uploaded{file_extension}")
            files_to_cleanup.append(upload_path)

            with open(upload_path, "wb") as f:
                f.write(await input_file.read())

            # Convert to WAV if not already in WAV format
            if file_extension == ".wav":
                wav_file_path = upload_path
            elif file_extension in [".mp3", ".mp4"]:
                wav_file_path = os.path.join(UPLOAD_DIR, "uploaded_audio.wav")
                files_to_cleanup.append(wav_file_path)

                # Use ffmpeg to convert to 16-bit PCM WAV
                try:
                    ffmpeg_command = [
                        "ffmpeg",
                        "-i",
                        upload_path,  # Input file
                        "-ar",
                        "44100",  # Sample rate (44.1 kHz)
                        "-ac",
                        "1",  # Mono channel
                        "-sample_fmt",
                        "s16",  # 16-bit PCM format
                        wav_file_path,  # Output file
                    ]
                    subprocess.run(ffmpeg_command, check=True)
                except subprocess.CalledProcessError as e:
                    raise HTTPException(
                        status_code=500, detail=f"FFmpeg conversion failed: {e}"
                    )
            else:
                raise HTTPException(status_code=400, detail="Unsupported file type.")
        else:
            raise HTTPException(status_code=400, detail="No valid input provided.")

        # Step 2: Transcribe to MIDI using the pre-trained model
        midi_file_path = os.path.join(OUTPUT_DIR, "transcribed.midi")
        files_to_cleanup.append(midi_file_path)
        transcription_command = [
            "onsets_frames_transcription_transcribe",
            "--model_dir=maestro_checkpoint/train",
            wav_file_path,
        ]
        try:
            output_path = wav_file_path + ".midi"
            files_to_cleanup.append(output_path)
            subprocess.run(transcription_command, check=True)
            os.rename(output_path, midi_file_path)  # Output MIDI from the model
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Transcription failed: {e}")

        # Step 3: Simplify MIDI
        simplified_midi_path = os.path.join(OUTPUT_DIR, "simplified_output.midi")
        files_to_cleanup.append(simplified_midi_path)
        try:
            from simplify_midi import clean_midi

            clean_midi(
                input_midi_path=midi_file_path,
                output_midi_path=simplified_midi_path,
                quantization_factor=4,
                velocity_threshold=20,
                max_simultaneous_notes=3,
            )
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"MIDI simplification failed: {e}"
            )

        # Step 4: Convert MIDI to PDF
        pdf_file_path = os.path.join(OUTPUT_DIR, "output.pdf")
        # files_to_cleanup.append(pdf_file_path)
        pdf_command = [
            MUSESCORE_PATH,
            "-o",
            pdf_file_path,
            simplified_midi_path,
        ]
        try:
            subprocess.run(pdf_command, check=True)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"PDF conversion failed: {e}")

        # Step 5: Return the resulting PDF file
        # response = FileResponse(pdf_file_path, media_type="application/pdf")

        # Create a ZIP file containing the PDF and MIDI file

        # zip_file_path = os.path.join(OUTPUT_DIR, "results.zip")
        # with zipfile.ZipFile(zip_file_path, "w") as zipf:
        #     # Add the PDF and MIDI files to the ZIP file
        #     zipf.write(pdf_file_path, os.path.basename(pdf_file_path))
        #     zipf.write(
        #         simplified_midi_path, os.path.basename(simplified_midi_path)
        #     )  # Add your actual MIDI file here

        # Return the ZIP file for download
        # response = FileResponse(
        #     zip_file_path, media_type="application/zip", filename="results.zip"
        # )
        response = FileResponse(
            pdf_file_path, media_type="application/pdf", filename="output.pdf"
        )

        return response

    except Exception as e:
        for filename in os.listdir(OUTPUT_DIR):
            file_path = os.path.join(OUTPUT_DIR, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print("Failed to delete %s. Reason: %s" % (file_path, e))
        for filename in os.listdir(UPLOAD_DIR):
            file_path = os.path.join(UPLOAD_DIR, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print("Failed to delete %s. Reason: %s" % (file_path, e))
        raise e


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
