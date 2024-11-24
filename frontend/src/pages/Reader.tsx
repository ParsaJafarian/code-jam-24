// import PDFViewer from '../components/PDFViewer'
import { Navbar } from '@/components/Navbar'
import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
// import { useState } from 'react';

export default function Reader() {
    const [pdfFile, setPdfFile] = useState("");
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [youtubeLink, setYoutubeLink] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPdfFile(fileUrl);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && file.type.startsWith('audio/')) {
            setAudioFile(file)
            setYoutubeLink('')
            setError(null)
        } else {
            setError('Please select a valid audio file.')
        }
    }

    const handleYoutubeLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        const link = event.target.value
        setYoutubeLink(link)
        setAudioFile(null)
        setError(null)

        if (link && !link.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
            setError('Please enter a valid YouTube link.')
        }
    }

    return (
        <main className="bg-red-500 min-h-screen relative overflow-hidden">
            <Navbar />

            <div className="mt-3.5 max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative z-10">
                <h1 className="text-3xl font-bold text-center py-4 bg-[#ffff00] text-black">
                    Musical PDF Viewer
                </h1>
                {pdfFile ? (
                    <PDFViewer pdfUrl={pdfFile} />
                ) : (
                    <p className="text-center text-gray-500 py-4">
                        Please upload a PDF to view.
                    </p>
                )}
            </div>

            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Audio Upload</h2>
                
                <div className="mb-6">
                    <p className="block mb-2 font-medium">Upload Audio File</p>
                    <input
                        id="audio-file"
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        onClick={() => document.getElementById('audio-file')?.click()}
                        className="w-full bg-white text-black border-2 border-[#ffff00] hover:bg-[#ffff00]/90"
                    >
                        Select Audio File
                    </Button>
                    {audioFile && (
                        <p className="mt-2 text-sm text-green-600">Selected file: {audioFile.name}</p>
                    )}
                </div>

                <div className="mb-6">
                    <p className="block mb-2 font-medium">Or Enter YouTube Link</p>
                    <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeLink}
                        onChange={handleYoutubeLinkChange}
                        className="w-full px-3 py-2 bg-white text-black border-2 border-[#ffff00] placeholder-gray-500 rounded-md focus:outline-none"
                    />
                    {youtubeLink && !error && (
                        <p className="mt-2 text-sm text-green-600">YouTube link provided</p>
                    )}
                </div>

                {error && (
                    <div className="flex items-center text-red-500 mb-4">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <Button 
                    className="w-full bg-[#ffff00] text-black hover:bg-[#ffff00]/90" 
                    disabled={!audioFile && !youtubeLink}
                >
                    Submit
                </Button>
            </div>
        </main>
    )
}
