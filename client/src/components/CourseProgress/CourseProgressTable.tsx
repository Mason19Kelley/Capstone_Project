
import { Table } from 'antd';
import './CourseProgress.css'
import { useEffect, useState } from 'react';
import { Completion } from '../../models/course-completion-response';



function CourseProgressTable(props: {courses: Completion[]}) {
    const [dataSource, setDataSource] = useState<object[]>([])
    const columns = [
        {
          title: <span style={{fontFamily: 'Oswald', fontSize:'1.3em'}}>Course</span>,
          dataIndex: 'course',
          key: 'course',
        },
        {
          title: <span style={{fontFamily: 'Oswald', fontSize:'1.3em'}}>Modules Completed</span>,
          dataIndex: 'modules',
          key: 'modules',
        },
        {
          title: <span style={{fontFamily: 'Oswald', fontSize:'1.3em'}}>Content Completed</span>,
          dataIndex: 'content',
          key: 'content',
        },
      ];

  useEffect(() => {
    setDataSource(props.courses.map((course, i) => ({
        key: i,
        course: <span style={{fontFamily: 'Oswald', fontSize:'1.2em'}}>{course.courseName}</span>,
        modules: <span style={{fontFamily: 'Oswald', fontSize:'1.2em'}}>{course.moduleCompleted} / {course.totalModules}</span>,
        content: <span style={{fontFamily: 'Oswald', fontSize:'1.2em'}}>{course.contentCompleted} / {course.totalContent}</span>,
        completed: course.completed,
    })))
  }, [props.courses])


  return (
    <Table dataSource={dataSource} columns={columns} pagination={{ position: ['none', 'none'] }} rowClassName={(record: any) => record.completed as boolean ? 'completed-row' :  ''}/>
  )
} 

export default CourseProgressTable;
