import React, { useState } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';

interface SimplePDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const SimplePDFViewer: React.FC<SimplePDFViewerProps> = ({ pdfUrl, title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-5xl h-[90vh] bg-gray-900 rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white truncate">{title}</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.open(pdfUrl, '_blank')}
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
        <div className="flex-1 overflow-hidden">
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0`} 
            className="w-full h-full border-none" 
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default SimplePDFViewer;
