import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Loader2,
  Download,
  FileMusic,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";

const API_URL = "http://localhost:8000";

export default function TranscriptionPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setYoutubeLink("");
      setError(null);
      setPdfUrl(null);
    } else {
      setError("Please select a valid audio file.");
    }
  };

  const handleRemoveFile = () => {
    setAudioFile(null);
    const fileInput = document.getElementById("audio-file") as HTMLInputElement;
    if (fileInput) fileInput.value = ""; // Reset the file input
  };

  const handleYoutubeLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const link = event.target.value;
    setYoutubeLink(link);
    setAudioFile(null);
    setError(null);
    setPdfUrl(null);

    if (
      link &&
      !link.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
    ) {
      setError("Please enter a valid YouTube link.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      const formData = new FormData();

      if (audioFile) {
        formData.append("input_file", audioFile);
      } else if (youtubeLink) {
        formData.append("youtube_url", youtubeLink);
      } else {
        throw new Error("Please provide either an audio file or YouTube link.");
      }

      const response = await fetch(`${API_URL}/process/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Processing failed");
      }

      // Create a blob URL from the PDF response
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-red-500 py-8 flex items-center justify-center">
        <div className="w-1/2 mx-auto px-4">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-2xl text-center font-semibold">
                🎵 Music Transcription Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Audio File Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Audio File
                    </label>
                    <input
                      id="audio-file"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        document.getElementById("audio-file")?.click()
                      }
                      className="w-full flex items-center justify-center gap-2"
                      variant="outline"
                    >
                      <FileMusic className="w-4 h-4" />
                      Select Audio File
                    </Button>
                    {audioFile && (
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-green-600">
                          Selected: {audioFile.name}
                        </p>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleRemoveFile}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Separator */}
                  <div className="text-center text-sm text-gray-500">OR</div>

                  {/* YouTube Link Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Enter YouTube Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeLink}
                        onChange={handleYoutubeLinkChange}
                        className="flex-1 px-3 text-black bg-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setYoutubeLink("")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isProcessing || (!audioFile && !youtubeLink) || !!error
                    }
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Transcribe Music"
                    )}
                  </Button>
                </div>
              </form>

              {/* Transcription Result */}
              {pdfUrl && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Transcription Result
                    </h3>
                    <Button
                      onClick={() => window.open(pdfUrl, "_blank")}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </div>
                  <iframe
                    src={pdfUrl}
                    className="w-full h-[600px] border rounded-lg"
                    title="PDF Viewer"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
