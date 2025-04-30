import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const changePage = (offset: number) => {
    if (numPages) {
      const newPage = pageNumber + offset;
      if (newPage >= 1 && newPage <= numPages) {
        setPageNumber(newPage);
      }
    }
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-5xl h-[90vh] bg-gray-900 rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white truncate">{title}</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={downloadPdf}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Download PDF"
            >
              <FaDownload />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto p-4 flex justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error('Error loading PDF:', error)}
            className="pdf-document"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-page"
              width={Math.min(window.innerWidth * 0.8, 800)}
            />
          </Document>
        </div>

        {/* Footer with pagination */}
        {numPages && (
          <div className="flex items-center justify-center p-4 border-t border-gray-700">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className={`p-2 rounded-full ${
                pageNumber <= 1 ? 'text-gray-600' : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <FaChevronLeft />
            </button>
            <span className="mx-4 text-gray-300">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={nextPage}
              disabled={pageNumber >= (numPages || 1)}
              className={`p-2 rounded-full ${
                pageNumber >= (numPages || 1) ? 'text-gray-600' : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
