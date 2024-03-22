import { Box } from '@mui/system';
import './Courses.css'
import { Card, Image } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react'
import { CourseAPI } from '../../api/CourseAPI';
import { Courses } from '../../models/courses.model';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface CardProps {
  courseName: string;
  instructor: string;
  cid: number;
}

// Generating the card
function generateCard({courseName, instructor, cid}: CardProps) {
  // Template for the image on the top of the card
  const boxTemplate = {
    width: 1,
    height:147,
    borderRadius: 1,
    bgcolor: 'gray'
  };

  // Building the Actual card, obtaining the name and instructor
  return (
    <Link to={`/courses/${cid}`}>
    <Card hoverable={true} style={{ width: 300 }} cover={ <Box sx={ boxTemplate } /> }>
      <Meta title = { courseName } description= { instructor } />
    </Card>
    </Link>
  );
}

function getCoursesCards(): JSX.Element[] {

  const { user } = useContext(AuthContext)
  const { id } = user || {}

  const [courses, setCourses] = useState<Courses[]>([]);
  useEffect(() => {
    const fetchData = async () => {
    try {
      const coursesData = await CourseAPI.getCoursesFromUser(id ?? 0);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }};
    fetchData();
  }, [id]);

  const cards: JSX.Element[] = [];
  for (let index = 0; index < courses.length; index++) {
    const courseName = courses?.[index]?.courseName || ''
    const instructor = courses?.[index]?.instructor || ''
    const cid = courses?.[index]?.cid || 0

    const params: CardProps = {courseName, instructor, cid}

    cards.push(generateCard(params))
  }

  return cards
}

const Courses: React.FC = () => {
  
  const cards = getCoursesCards()
  return (
    <div className='c-wrapper'>
      <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
      <h1 className='header' style= {{
        color:'#0c2245', 
        fontFamily: 'Playfair-Display', 
        paddingLeft: 50, paddingTop: 10}}>
          Courses Dashboard</h1>
      <div className='testcard'>
      {cards.map(card => <Box>{card}</Box>)}
      </div>
    </div>
  );
};
  

export default Courses;