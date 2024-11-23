'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
    pdfUrl: string
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
    }

    return (
        <div className="p-4">
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex justify-center"
            >
                <Page pageNumber={pageNumber} renderTextLayer={false} />
            </Document>
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                    disabled={pageNumber <= 1}
                    variant="outline"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <p className="text-sm text-gray-500">
                    Page {pageNumber} of {numPages}
                </p>
                <Button
                    onClick={() => setPageNumber(page => Math.min(page + 1, numPages || 1))}
                    disabled={pageNumber >= (numPages || 1)}
                    variant="outline"
                >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

