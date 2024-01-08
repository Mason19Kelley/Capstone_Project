
import './Dashboard.css'
import { Card, Image } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';

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
      <h1 className='self-start'>Dashboard</h1>
      <div className='cards'>
        {cards.map(card => <Card style={{width: '100%'}}>{card}</Card>)}
        
      </div>
    </div>
  )
}

export default Dashboard;
