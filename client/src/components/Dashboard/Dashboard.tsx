
import './Dashboard.css'
import { Card, ConfigProvider, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Box, ThemeProvider } from '@mui/system';
import Meta from 'antd/es/card/Meta';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Courses } from '../../models/courses.model';
import { CourseAPI } from '../../api/CourseAPI';
import { FileAPI } from '../../api/FileAPI';
import ReactPlayer from 'react-player';

const cards: string[] = [
    'My Courses',
    'Completed Courses',
    'Certifications',
    'Account'
]

  // Here is where we create the cards
  interface CardProps {
    courseName: string;
    instructor: string;
  }

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

    const params: CardProps = {courseName, instructor}

    cards.push(generateCard(params))
  }

  return cards
}

function Dashboard() {
  const [ videoURL, setVideoURL ] = useState("");
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await FileAPI.getFile('sample-5s.mp4');
        setVideoURL(URL.createObjectURL(response));
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, []);

  const Coursecards = getCoursesCards();
  
  return (
    <div className='wrapper'>
      <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
      <h1 className='self-start' style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingLeft: 50, paddingTop: 10}}>Dashboard</h1>
      <div className='cards'>
        <ConfigProvider theme={{ token: { fontFamily: "Mulish", fontSize: 30, paddingLG: 18 } }}>
            {cards.map(card => <Card style={{width: '100%'}}><Typography.Text>{card}</Typography.Text></Card>)}
        </ConfigProvider>
      </div>

      <div className='learningDashboard'>
        <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
          <Box sx={{
            width:1,
            height:400,
            borderRadius: 1,
            bgcolor: 'primary.main',
          }}>
            <Typography.Title level={3} style={{paddingLeft: '2%', paddingTop: '2%'}}>
              <div className='dashboardText'>
              Learning Dashboard
              </div>
            </Typography.Title>
            <div className='testcard'>{Coursecards.map(c => <Box>{c}</Box>)}</div>
          </Box>
        </ThemeProvider>
      </div>
      <div className='learningDashboard'>
        <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
          <Box sx={{
            width: 1,
            height:350,
            borderRadius: 1,
            bgcolor: 'primary.main'
          }}>
            <ReactPlayer url={videoURL} controls={true} />
            </Box>
        </ThemeProvider>
      </div>
    </div>
    
  )
}

export default Dashboard;
