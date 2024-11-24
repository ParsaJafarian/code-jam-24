import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

export default function AudioUpload() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [youtubeLink, setYoutubeLink] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

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

    // Basic YouTube link validation
    if (link && !link.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
      setError('Please enter a valid YouTube link.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-transparent border-2 border-[#ffff00] rounded-lg shadow-md">
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
          className="w-full bg-[#ffffff] text-black hover:bg-[#ffff00]/90"
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
          className="w-full px-3 py-2 bg-white text-black placeholder-gray-500 rounded-md focus:outline-none"
        />
        {youtubeLink && !error && (
          <p className="mt-2 text-sm text-[#ffff00]">YouTube link provided</p>
        )}
      </div>

      {error && (
        <div className="flex items-center text-[#ffff00] mb-4">
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
  )
}

