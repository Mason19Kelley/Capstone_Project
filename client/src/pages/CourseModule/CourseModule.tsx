import React, { useContext, useEffect, useState } from 'react';
import './CourseModule.css';
import PDFViewer from './PDFView';
import QuizComponent from './Quiz'; 
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { Button, message, Steps, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { CourseAPI } from '../../api/CourseAPI';
import { StepContext } from '../../context/StepContext';
import { AuthContext } from '../../context/AuthContext';

interface Step {
  title: string;
  content: JSX.Element | string;
}

interface Course {
  courseName: string;
  modules: Module[];
 }
 
 interface Module {
  moduleName: string;
  moduleID: string;
  content: Content[];
 }
 
 interface Content {
  contentType: string;
  fileType?: string;
  fileName?: string;
  quizID?: string;
  Description?: string;
 }

const CourseModule: React.FC = () => {
  const { user } = useContext(AuthContext)
  const { courseId } = useParams();
  const { token } = theme.useToken();
  const [truesteps, setTrueSteps] = useState<Step[]>([]);
  const [contentDone, setContentDone] = useState(false)
  const { currentStep, setCurrentStep } = useContext(StepContext);
  const [courseJson, setCourseJson ] = useState<Course>();
  const [ currentModuleIndex, setCurrentModuleIndex ] = useState<number>(0);
  const [ items, setItems ] = useState<{key: string; title: string;}[]>()

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
    updateCourseCompletion(currentModuleIndex, currentStep+1)
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };


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
    if(done){
      updateCourseCompletion(currentModuleIndex, currentStep+1)
    }
  }

  const checkPdfDone = () => {
    setContentDone(true)
  }

  const checkVideoDone = () => {
    setContentDone(true)
  }
  
  const finishModule = () => {
    message.success('Module Complete!')
    updateCourseCompletion(currentModuleIndex+1, 0)
    setCurrentModuleIndex(currentModuleIndex+1)
    setModule(courseJson, currentModuleIndex+1)
    setCurrentStep(0)
  }

  const setModule = (data?: Course, moduleIndex?: number) => {
    const moduleSteps: Step[] = [];

      data?.modules[moduleIndex ?? 0]?.content.forEach((content: any) => {
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
            title: `${content.fileName}`,
            content: stepContent
          });
        }
      });
      if (moduleSteps.length > 0) {
        setTrueSteps(moduleSteps);
        setItems(moduleSteps.map((item) => ({ key: item.title, title: item.title })))
      } else {
        console.error("No content found in the modules:", data?.modules);
      }
  }

  const updateCourseCompletion = (moduleCompleted: number, contentCompleted: number) => {
    CourseAPI.updateCourseCompletion(user?.id ?? -1, +(courseId ?? '-1') ?? -1, moduleCompleted, contentCompleted).then(response => {
      console.log(response)
    })

  }



  return (
    <div className="cmod-container">
      <div className="flex justify-between w-[98%] ml-[1%] mr-[1%] mt-[1%] mb-[1%]">
        <Link to={`/courses/${courseId}`}>
          <Button type="primary">Back To Overview</Button>
        </Link>
        <span className="font-semibold text-2xl">{courseJson?.modules[currentModuleIndex].moduleName}</span>
        <Button type="primary">Next Module</Button>
      </div>
        <div className="content-box">
          <>
            <Steps current={currentStep} items={items} className='mr-[1%] ml-[1%] w-[98%] mt-[0.5%] mb-[0.5%]'/>
            <div style={contentStyle} className='ml-[1%] mr-[1%] w-[98%]'>
              {truesteps[currentStep]?.content}
            </div>
            <div style={{ marginTop: 24 }}>
              {currentStep > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={prev}>
                  Previous
                </Button>
              )}
              {currentStep < truesteps.length - 1 && (
                <Button type="default" disabled={!contentDone} onClick={next}>
                  Next
                </Button>
              )}
              {currentStep === truesteps.length - 1 && (
                <Button type="primary" onClick={finishModule} disabled={!contentDone} className="course-button">
                  Done
                </Button>
              )}
            </div>
          </>
        </div>
      </div>
  );
};

export default CourseModule;
