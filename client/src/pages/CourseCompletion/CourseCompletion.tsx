import { Button } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';



const CourseCompletion: React.FC = () => {
  
  const { courseName, id } = useParams();
  console.log(courseName)

  return (
    <div>
      <h1>Course Completion</h1>
      <p>Congratulations on completing the course: {courseName}</p>
      <Button type="primary">
        <Link to={`/courses/${id}`}>
          {`Return to ${courseName}`}
        </Link>
      </Button>
    </div>
  );
};

export default CourseCompletion;

