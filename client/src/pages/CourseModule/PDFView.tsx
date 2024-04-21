import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileAPI } from '../../api/FileAPI';
import { Spin, Button } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PDFViewerProps {
  fileName: string;
  done: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileName, done }) => {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pdfFile, setPdfFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const fetchPDF = async (): Promise<void> => {
      try {
        done();
        const pdfBlob: Blob = await FileAPI.getFile(fileName);
        setPdfFile(pdfBlob);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PDF file:', error);
      }
    };

    fetchPDF();

    // Update container width on window resize
    const handleResize = (): void => {
      setContainerWidth(window.innerWidth * 0.69); // 90% of viewport width
    };
    handleResize(); // Initial call to set container width
    window.addEventListener('resize', handleResize);
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fileName, done]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setPageCount(numPages);
  };

  const handleIncreaseScale = (): void => {
    const newScaleFactor: number = scaleFactor + 0.25;
    setScaleFactor(Math.min(newScaleFactor, 2.0)); // Limit scale factor to 2.0
  };

  const handleDecreaseScale = (): void => {
    const newScaleFactor: number = scaleFactor - 0.25;
    setScaleFactor(Math.max(newScaleFactor, 0.5)); // Limit scale factor to 0.5
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Button onClick={handleDecreaseScale}>-</Button>
        <span style={{ margin: '0 16px' }}>Size: {scaleFactor}</span>
        <Button onClick={handleIncreaseScale}>+</Button>
      </div>
      <div style={{ maxWidth: '90%', maxHeight: '60vh', margin: '0 auto' }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {pageCount && Array.from(new Array(pageCount), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                width={containerWidth * scaleFactor}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
