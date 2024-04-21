import React, { useContext, useEffect, useState } from 'react';
import './CourseModule.css';
import PDFViewer from './PDFView';
import QuizComponent from './Quiz'; 
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { Button, message, Steps, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { CourseAPI } from '../../api/CourseAPI';
import { StepContext } from '../../context/StepContext';

interface Step {
  title: string;
  content: JSX.Element | string;
}

const CourseModule: React.FC = () => {
  const { courseId } = useParams();
  const { token } = theme.useToken();
  const [truesteps, setTrueSteps] = useState<Step[]>([]);
  const [contentDone, setContentDone] = useState(false)
  const { currentStep, setCurrentStep } = useContext(StepContext);

  useEffect(() => {
    CourseAPI.getCourses(+(courseId ?? -1)).then(response => {
      const data = JSON.parse(response.jsonInformation);
      console.log("Received data:", data);
      const moduleSteps: Step[] = [];

      data.modules.forEach((module: { content: any[]; moduleName: any; }) => {
        module.content.forEach((content) => {
          let stepContent;

          if (content.contentType === 'Media') {
            if (content.fileType === 'mp4' || content.fileType === 'x-matroska') {
              stepContent = <VideoPlayer fileName={content.fileName} done={checkVideoDone}/>;
            } else if (content.fileType === 'pdf') {
              stepContent = <PDFViewer fileName={content.fileName} done={checkPdfDone}/>;
            }
          } else if (content.contentType === 'Quiz') {
            stepContent = <QuizComponent quizId={content.quizID} done={checkQuizDone}/>;
          }

          if (stepContent) {
            moduleSteps.push({
              title: `${module.moduleName} - ${content.fileName}`,
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
    setContentDone(false)
    setCurrentStep(currentStep + 1);
    console.log(currentStep)
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const items = truesteps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
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

  const checkPdfDone = () => {
    setContentDone(true)
  }

  const checkVideoDone = () => {
    setContentDone(true)
  }

  const content = truesteps[currentStep] ? truesteps[currentStep].content : null;

  const moduleName = truesteps[currentStep] ? truesteps[currentStep].title.split(' - ')[0] : '';

  return (
    <div className="cmod-container">
      <div className="back-button">
        <Link to={`/courses/${courseId}`}>
          <button type="button">Back</button>
        </Link>
      </div>
      <div className="cmod-box">
        <h3>{moduleName}</h3>
        <div className="content-box">
          <>
            <Steps current={currentStep} items={items} />
            <div style={contentStyle}>
              {content}
            </div>
            <div style={{ marginTop: 24 }}>
              {currentStep < truesteps.length - 1 && (
                <Button type="default" disabled={!contentDone} onClick={() => next()}>
                  Next
                </Button>
              )}
              {currentStep === truesteps.length - 1 && (
                <Button type="default" onClick={() => message.success('Module Complete!')} className="course-button">
                  Done
                </Button>
              )}
              {currentStep > 0 && (
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
