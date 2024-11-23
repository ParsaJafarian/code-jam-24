import PDFViewer from '../components/PDFViewer'
import MusicNotes from '../components/MusicNotes'

export default function Reader() {
    return (
        <main className="min-h-screen bg-lavender p-4 sm:p-8 relative overflow-hidden">
            <MusicNotes />
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative z-10">
                <h1 className="text-3xl font-bold text-center py-4 bg-indigo-600 text-white">Musical PDF Viewer</h1>
                <PDFViewer pdfUrl="/sample.pdf" />
            </div>
        </main>
    )
}

