import React, { useEffect, useState } from 'react';
import './CourseModule.css';
import PDFViewer from './PDFView';
import QuizComponent from './Quiz'; // Import the QuizComponent
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { Button, message, Steps, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { CourseAPI } from '../../api/CourseAPI';
//import { QuizAPI } from '../../../../api/QuizAPI';

interface Step {
  title: string;
  content: JSX.Element | string;
}

const CourseModule: React.FC = () => {
  const { courseId } = useParams();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [truesteps, setTrueSteps] = useState<Step[]>([]);
  const [contentDone, setContentDone] = useState(false)

  useEffect(() => {
    CourseAPI.getCourses(+(courseId ?? -1)).then(response => {
      const data = JSON.parse(response.jsonInformation);
      console.log("Received data:", data);
      const moduleSteps: Step[] = [];

      data.modules.forEach((module: { content: any[]; moduleName: any; }) => {
        module.content.forEach((content) => {
          let stepContent;

          if (content.contentType === 'Media') {
            if (content.fileType === 'mp4') {
              stepContent = <VideoPlayer />;
            } else if (content.fileType === 'pdf') {
              stepContent = <PDFViewer fileName={content.fileName} />;
            }
          } else if (content.contentType === 'Quiz') {
            stepContent = <QuizComponent quizId={content.quizId} done={checkQuizDone}/>;
          }

          if (stepContent) {
            moduleSteps.push({
              title: `Module ${module.moduleName} - ${content.fileName}`,
              content: stepContent
            });
          }
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
    setContentDone(false)
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = truesteps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 1,
  };

  const checkQuizDone = (done: boolean) => {
    setContentDone(done)
  }

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
                <Button type="default" disabled={!contentDone} onClick={() => next()}>
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
