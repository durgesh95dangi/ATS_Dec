'use client';

import { Button } from '@/components/ui/Button';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export function DownloadButton() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        const element = document.getElementById('resume-preview');
        if (!element) {
            console.error('Resume preview element not found');
            return;
        }

        try {
            setIsGenerating(true);

            // Give the UI a moment to update state before heavy work
            await new Promise(resolve => setTimeout(resolve, 100));

            // Use html-to-image instead of html2canvas
            const dataUrl = await toPng(element, {
                quality: 0.95,
                pixelRatio: 2, // Better resolution
                backgroundColor: '#ffffff', // Ensure white background
            });

            // A4 dimensions in mm
            const pdfWidth = 210;
            const pdfHeight = 297;

            const pdf = new jsPDF('p', 'mm', 'a4');

            // Calculate height based on A4 width and element aspect ratio
            const pdfImageWidth = pdfWidth;
            const pdfImageHeight = (element.scrollHeight * pdfWidth) / element.scrollWidth;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
            pdf.save('resume.pdf');

        } catch (error) {
            console.error('Failed to generate PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button onClick={handleDownload} disabled={isGenerating} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4 py-2">
            {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Download className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
    );
}
