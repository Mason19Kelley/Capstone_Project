import './Management.css'
import { Button, Card, ConfigProvider, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { Box, ThemeProvider } from '@mui/system';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const temp: string[] = ['Cyber', 'OSHA', 'Python', 'Forklift']

function addCourse() {
  console.log('Add Course')
}



function cards() {
  return (
    <div style={{ justifyContent: 'space-between' }}>
      {temp.map((course) => (
        <Card className='Courses' key={course} style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}>
          <Typography.Text style={{ color: '#0c2245', fontFamily: 'Playfair-Display', fontSize: '20px'}}>
            {course}
          </Typography.Text>
          <button onClick={() => buttonPress(course)} style= {{textAlign: 'right'}}>
            <EditOutlined />
          </button>
        </Card>
      ))}
    </div>
  );
}

function buttonPress(course: string) {
  console.log(`Button ${course} pressed`);
}

function Management() {
  
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
        <div style={{height: '10px'}}>{cards()}</div>
        </div>
    </div>
  )
}

export default Management;
