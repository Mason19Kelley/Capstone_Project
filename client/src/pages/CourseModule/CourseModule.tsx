import React, { useEffect, useState } from 'react';
import './CourseModule.css';
import PDFViewer from './PDFView';
import QuizComponent from './Quiz'; // Import the QuizComponent
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { Button, message, Steps, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { CourseAPI } from '../../api/CourseAPI';
//import { QuizAPI } from '../../../../api/QuizAPI';

/*const steps = [
  {
    title: 'First',
    content: <PDFViewer />,
  },
  {
    title: 'Second',
    content: <QuizComponent />, // Use the QuizComponent here
  },
  {
    title: 'Third',
    content: <QuizComponent />, // Use the QuizComponent here
  },
  {
    title: 'Last',
    content: 'Check out this text. It rocks!',
  },
];
*/
interface Step {
  title: string;
  content: JSX.Element | string;
}

function generateSteps(totalContent: number, contentType: string, fileType?: string): Step[] {
  const steps: Step[] = [];
  
  for (let i = 0; i < totalContent; i++) {
    if (i === 0) {
      steps.push({
        title: `Step ${i + 1}`,
        content: contentType === 'Media' && fileType === 'mp4' ? <VideoPlayer /> : <PDFViewer />,
      });
    } else if (i === totalContent - 1) {
      steps.push({
        title: `Last`,
        content: 'Check out this text. It rocks!',
      });
    } else {
      steps.push({
        title: `Step ${i + 1}`,
        content: contentType === 'Media' && fileType === 'mp4' ? <VideoPlayer /> : <QuizComponent />,
      });
    }
  }
  
  return steps;
}

const CourseModule: React.FC = () => {
  const { courseId } = useParams();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [truesteps, setTrueSteps] = useState<Step[]>([]);

  useEffect(() => {
    CourseAPI.getCourses(+(courseId ?? -1)).then(response => {
      const data = JSON.parse(response.jsonInformation);
      console.log("Received data:", data); // Log the received data for debugging
  
      const moduleSteps: Step[] = [];
      // Iterate through each module and its content
      data.modules.forEach(module => {
        module.content.forEach((content, index) => {
          let contentType = content.contentType;
          let fileType = content.fileType;
          // Adjust the contentType and fileType based on the index
          if (index === 0) {
            // For the first content item in the module
            if (!contentType || (contentType === 'Media' && !fileType)) {
              // If contentType is not specified or if it's 'Media' without fileType, default to 'pdf'
              contentType = 'Media';
              fileType = 'pdf';
            }
          } else {
            // For subsequent content items in the module
            if (!contentType || (contentType === 'Media' && !fileType)) {
              // If contentType is not specified or if it's 'Media' without fileType, default to 'quiz'
              contentType = 'Quiz';
              fileType = null;
            }
          }
          // Generate step based on contentType and fileType
          const stepContent = contentType === 'Media' ? <VideoPlayer /> : <QuizComponent />;
          moduleSteps.push({
            title: `Module ${module.moduleName} - ${content.fileName}`, // Adjust title as needed
            content: stepContent
          });
        });
      });
  
      if (moduleSteps.length > 0) {
        setTrueSteps(moduleSteps);
      } else {
        console.error("No content found in the modules:", data.modules);
      }
    }).catch(error => {
      console.error("Error fetching course data:", error);
    });
  }, [courseId]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = truesteps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 1,
  };

  // Ensure truesteps[current] is defined before accessing its content property
  const content = truesteps[current] ? truesteps[current].content : null;

  return (
    <div className="cmod-container">
      <div className="back-button">
        <Link to="/home">
          <button type="button">Back</button>
        </Link>
      </div>
      <div className="cmod-box">
        <h3>Example Course Module</h3>
        <div className="content-box">
          <>
            <Steps current={current} items={items} />
            <div style={contentStyle}>
              {content}
            </div>
            <div style={{ marginTop: 24 }}>
              {current < truesteps.length - 1 && (
                <Button type="default" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === truesteps.length - 1 && (
                <Button type="default" onClick={() => message.success('Module Complete!')} className="course-button">
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={prev}>
                  Previous
                </Button>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
export default CourseModule;
