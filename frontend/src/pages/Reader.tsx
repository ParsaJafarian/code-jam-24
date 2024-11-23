import PDFViewer from '../components/PDFViewer'
import { Navbar } from '@/components/Nabvar'

export default function Reader() {
    return (
        <main className="bg-red-500 min-h-screen relative overflow-hidden">
            <Navbar />
            <div className="mt-3.5 max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative z-10">
                <h1 className="text-3xl font-bold text-center py-4 bg-red-900 text-white">Musical PDF Viewer</h1>
                <PDFViewer pdfUrl="/sample.pdf" />
            </div>
        </main>
    )
}

