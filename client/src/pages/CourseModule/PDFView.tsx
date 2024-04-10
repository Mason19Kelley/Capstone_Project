import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileAPI } from '../../api/FileAPI'; // Import your FileAPI
import { Spin } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFViewerProps {
  fileName: string;
  done: () => void
}

export default function PDFViewer({ fileName, done }: PDFViewerProps) {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pdfFile, setPdfFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        done()
        const pdfBlob = await FileAPI.getFile(fileName);
        setPdfFile(pdfBlob);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PDF file:', error);
      }
    };

    fetchPDF();

    return () => {
      // Cleanup function
      setPdfFile(null);
      setLoading(true);
    };
  }, [fileName]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPageCount(numPages);
  }

  const renderPages = () => {
    if (pageCount) {
      return Array.from(new Array(pageCount), (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={false}
        />
      ));
    } else {
      return null;
    }
  };

  return (
    <div style={{ width: '1050px', height: '490px', overflow: 'auto' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {renderPages()}
        </Document>
      )}
    </div>
  );
}
