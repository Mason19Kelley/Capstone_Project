
import { Table } from 'antd';
import './CourseProgress.css'
import { useEffect, useState } from 'react';
import { Completion } from '../../models/course-completion-response';



function CourseProgressTable(props: {courses: Completion[]}) {
    const [dataSource, setDataSource] = useState<object[]>([])
    const columns = [
        {
          title: 'Course',
          dataIndex: 'course',
          key: 'course',
        },
        {
          title: 'Modules Completed',
          dataIndex: 'modules',
          key: 'modules',
        },
        {
          title: 'Content Completed',
          dataIndex: 'content',
          key: 'content',
        },
      ];

  useEffect(() => {
    setDataSource(props.courses.map((course, i) => ({
        key: i,
        course: course.courseName,
        modules: `${course.moduleCompleted} / ${course.totalModules}`,
        content: `${course.contentCompleted} / ${course.totalContent}`,
        completed: course.completed,
    })))
  }, [props.courses])


  return (
    <Table dataSource={dataSource} columns={columns} pagination={{ position: ['none', 'none'] }} rowClassName={(record: any) => record.completed as boolean ? 'completed-row' :  ''}/>
  )
} 

export default CourseProgressTable;
