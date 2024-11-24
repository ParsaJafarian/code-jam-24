// import PDFViewer from '../components/PDFViewer'
import { Navbar } from '@/components/Navbar'
import AudioUpload from '../components/AudioUpload'
// import { useState } from 'react';

export default function Reader() {
    // const [pdfFile, setPdfFile] = useState("");

    // const handleFileUpload = (event: any) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const fileUrl = URL.createObjectURL(file);
    //         setPdfFile(fileUrl);
    //     }
    // };

    return (
        <main className="bg-red-500 min-h-screen relative overflow-hidden">
            <Navbar />
            <AudioUpload />

            {/* <div className="mt-3.5 max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative z-10">
                <h1 className="text-3xl font-bold text-center py-4 bg-[#ffff00] text-black">
                    Musical PDF Viewer
                </h1>
                <div className="p-4">
                    <label
                        htmlFor="pdf-upload"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Upload PDF
                    </label>
                    <input
                        id="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
                {pdfFile ? (
                    <PDFViewer pdfUrl={pdfFile} />
                ) : (
                    <p className="text-center text-gray-500 py-4">
                        Please upload a PDF to view.
                    </p>
                )}
            </div> */}
        </main>
    );
}
