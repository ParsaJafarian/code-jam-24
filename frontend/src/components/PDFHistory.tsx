import React, { useEffect, useState } from 'react';
import { fetchPDFMetadata, clearPDFHistory } from '@/lib/utils'; // Import IndexedDB functions

interface PDFMetadata {
    id: number;
    name: string;
    url: string;
    timestamp: string;
}

const PDFHistory: React.FC = () => {
    const [pdfHistory, setPDFHistory] = useState<PDFMetadata[]>([]);

    // Fetch history on component mount
    useEffect(() => {
        const loadHistory = async () => {
            const data = await fetchPDFMetadata();
            setPDFHistory(data);
        };
        loadHistory();
    }, []);

    // Handle clearing history
    const handleClearHistory = async () => {
        await clearPDFHistory();
        setPDFHistory([]); // Clear UI
        alert('History cleared!');
    };

    return (
        <div>
            <h1>Your Download History</h1>
            {pdfHistory.length === 0 ? (
                <p>No history available.</p>
            ) : (
                <div>
                    {pdfHistory.map((pdf) => (
                        <div key={pdf.id} style={{ marginBottom: '1rem' }}>
                            <p>
                                <strong>{pdf.name}</strong>
                            </p>
                            <p>Downloaded on: {pdf.timestamp}</p>
                            <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                                Download Again
                            </a>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleClearHistory}>Clear History</button>
        </div>
    );
};

export default PDFHistory;
