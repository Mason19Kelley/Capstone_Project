
import './Dashboard.css'
import { Card, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Box, ThemeProvider } from '@mui/system';
import Meta from 'antd/es/card/Meta';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Courses } from '../../models/courses.model';
import { CourseAPI } from '../../api/CourseAPI';
import { Link } from 'react-router-dom';
import randomColor from 'randomcolor';

  // Here is where we create the cards
  interface CardProps {
    courseName: string;
    instructor: string;
    cid: number;
  }

  function generateCard({courseName, instructor, cid}: CardProps) {
    // Template for the image on the top of the card
    const boxTemplate = {
      width: 1,
      height:147,
      borderRadius: "5px",
      bgcolor: randomColor({luminosity: 'light'})
    };
  
    // Building the Actual card, obtaining the name and instructor
    return (
      <Link to={`/courses/${cid}`}>
      <Card hoverable={true} className="course-card" cover={ <Box sx={ boxTemplate } /> }>
        <Meta title = {<div className='cardText'>{ courseName }</div>} description= {<div className='cardText'>{instructor}</div> } />
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

function Dashboard() {

  const Coursecards = getCoursesCards();
  
  return (
    <div className='dashboard-wrapper'>
      <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
      <h1 style= {{color:'#0c2245', paddingTop: 10, marginLeft: "1%", textAlign: "start"}}>Dashboard</h1>

      <div className='learningDashboard'>
        <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
          <Box sx={{
            width:1,
            height: "fit-content",
            borderRadius: 1,
            bgcolor: 'primary.main',
          }}>
            <Typography.Title level={3} style={{paddingLeft: '2%', paddingTop: '2%'}}>
              <div className='dashboardText'>
              Learning Dashboard
              </div>
            </Typography.Title>
            <div className='test-card'>{Coursecards.map(c => <Box>{c}</Box>)}</div>
          </Box>
        </ThemeProvider>
      </div>
    </div>
    
  )
}

export default Dashboard;
