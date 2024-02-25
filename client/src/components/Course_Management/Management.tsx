import './Management.css'
import { Button, Card, ConfigProvider, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Box, ThemeProvider } from '@mui/system';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const temp: string[] = ['Cyber', 'OSHA', 'Python', 'Forklift']
const content: string[] = ['1', '2', '3', '4']



function Management () {

  const navigate = useNavigate();
  const [classList, setClassList] = useState(['Cyber', 'OSHA', 'Python', 'Forklift'])

  const addCourse = () => {
    length = classList.length;
    var newCourse = 'Course ' + length;
    //temp.push(newCourse);
    setClassList([...classList, newCourse]);
    console.log(newCourse);
    console.log(classList);
  }

  const removeCourse = (classtoRemove: string) => {
    const updatedClassList = classList.filter(item => item !== classtoRemove);
    setClassList(updatedClassList);
    console.log(classList);
  }

  const buttonPress = (course: string) => {
    console.log(course); 
    navigate(`/editCourse/${course}`);
  };
  

  const cards = () => {
    return (
      <div style={{gap:'10px', justifyContent: 'space-between' }}>
        {classList.map((course) => (
        <div className='courses'>
          <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
            <Box
              sx={{
                width: 1,
                height: 75,
                borderRadius: 1,
                bgcolor: 'primary.main',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2%',
              }}
            >
              <Typography.Title level={3} style={{ textAlign: 'left' }}>
                <div className='dashboardText'>{course}</div>
              </Typography.Title>
              <div style = {{display:'flex'}}>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => buttonPress(course)}>
                  <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => removeCourse(course)}>
                  <DeleteOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
              </div>
            </Box>
          </ThemeProvider>
        </div>
        ))}
      </div>
    );
  }


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
      <h1 className='self-start' style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingLeft: 50, paddingTop: 10}}>Course Management</h1>
      <div className='courses'>
        <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
          <Box
            sx={{
              width: 1,
              height: 75,
              borderRadius: 1,
              bgcolor: 'primary.main',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2%',
            }}
          >
            <Typography.Title level={3} style={{ textAlign: 'left' }}>
              <div className='dashboardText'>Courses</div>
            </Typography.Title>
            <Button className='noHover' type="primary" style={{ width: '50px', display:'flex', verticalAlign: 'middle' }} onClick = {addCourse}>
              <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
            </Button>
          </Box>
          </ThemeProvider>
          <div>{cards()}</div>
        </div>
    </div>
  )
}

export default Management;
