import { Box, bgcolor, color } from '@mui/system';
import './Courses.css'
import { Card, ConfigProvider } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react'
import { CourseAPI } from '../../api/CourseAPI';
import { Courses } from '../../models/courses.model';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface CardProps {
  courseName: string;
  instructor: string;
}

// Generating the card
function generateCard({courseName, instructor}: CardProps) {
  // Template for the image on the top of the card
  const boxTemplate = {
    width: 1,
    height:147,
    borderRadius: 1,
    bgcolor: 'gray'
  };

  // Building the Actual card, obtaining the name and instructor
  return (
    <Card hoverable={true} style={{ width: 300 }} cover={ <Box sx={ boxTemplate } /> }>
      <Meta title = { courseName } description= { instructor } />
    </Card>
  );
}

const Courses: React.FC = () => {
  const { user } = useContext(AuthContext)
  const { id } = user || {}

  const [courses, setCourses] = useState<Courses[]>([]);

  // created for testing purposes, inserting user into courses
  if(id != undefined) {
    CourseAPI.insertUser(2, id ?? 0)
    CourseAPI.insertUser(1, id ?? 0)
    CourseAPI.insertUser(3, id ?? 0)
  }

 useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await CourseAPI.getCoursesFromUser(id ?? 0);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
 }, [id]);

const cards: JSX.Element[] = [];
 for (let index = 0; index < courses.length; index++) {
  const courseName = courses?.[index]?.courseName || ''
  const instructor = courses?.[index]?.instructor || ''

  const params: CardProps = {courseName, instructor}

  cards.push(generateCard(params))
 }
  
  return (
    <div className='testcard'>
    {cards.map(card => <Box>{card}</Box>)}
    </div>


  
   
  );
};
  

export default Courses;