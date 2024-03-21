import React, { useState } from 'react';
import './CourseModule.css';
import PDFViewer from './PDFView';
import QuizComponent from './Quiz'; // Import the QuizComponent
import { Button, message, Steps, theme } from 'antd';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: 'First',
    content: <PDFViewer />,
  },
  {
    title: 'Second',
    content: <QuizComponent />, // Use the QuizComponent here
  },
  {
    title: 'Last',
    content: 'Check out this text. It rocks!',
  },
];

const CourseModule: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  //const [quizCompleted, setQuizCompleted] = useState(false); // State to track quiz completion

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 1,
  };

  //const handleQuizFinish = (isCompleted: boolean) => {
  //  setQuizCompleted(isCompleted); // Update quiz completion state
  //};

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
              {steps[current].content}
            </div>
            <div style={{ marginTop: 24 }}>
              {current < steps.length - 1 && (
                <Button type="default" onClick={() => next()}>
                Next
              </Button>
              )}
              {current === steps.length - 1 && (
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
