import { useState, useEffect } from 'react';
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
  const maxScaleFactor = 2.0; 
  const minScaleFactor = 0.5; 
  const contentBoxWidth = 1050; 
  const pageHeight = 445; 

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        done();
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
          width={contentBoxWidth} 
          height={pageHeight} 
          scale={scaleFactor}
          renderAnnotationLayer={false}
        />
      ));
    } else {
      return null;
    }
  };

  const handleIncreaseScale = () => {
    const newScaleFactor = scaleFactor + 0.25;
    if (newScaleFactor <= maxScaleFactor) {
      setScaleFactor(newScaleFactor);
    }
  };

  const handleDecreaseScale = () => {
    const newScaleFactor = scaleFactor - 0.25;
    if (newScaleFactor >= minScaleFactor) {
      setScaleFactor(newScaleFactor);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Button onClick={handleDecreaseScale} disabled={scaleFactor <= minScaleFactor}>-</Button>
        <span style={{ margin: '0 16px' }}>Size: {scaleFactor}</span>
        <Button onClick={handleIncreaseScale} disabled={scaleFactor >= maxScaleFactor}>+</Button>
      </div>
      <div style={{ width: `${contentBoxWidth}px`, height: `${pageCount ? pageCount * pageHeight : 490}px`, overflow: 'auto' }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {renderPages()}
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
