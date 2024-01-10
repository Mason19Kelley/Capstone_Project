
import './Dashboard.css'
import { Card, ConfigProvider, Image, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { AlignLeftOutlined, BoxPlotFilled } from '@ant-design/icons';
import { Box, ThemeProvider } from '@mui/system';

const cards: string[] = [
    'My Courses',
    'Completed Courses',
    'Certifications',
    'Account'
]

function Dashboard() {
  
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
            height:350,
            borderRadius: 1,
            bgcolor: 'primary.main',
          }}>
            <Typography.Text>Learning Dashboard</Typography.Text>
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
          }}/>
        </ThemeProvider>
      </div>
    </div>
    
  )
}

export default Dashboard;
