
import './Dashboard.css'
import { Card } from 'antd';

const cards: string[] = [
    'My Courses',
    'Completed Courses',
    'Certifications',
    'Account'
]

function Dashboard() {
  
  return (
    <div className='wrapper'>
      <h1 className='self-start'>Dashboard</h1>
      <div className='cards'>
        {cards.map(card => <Card style={{width: '100%'}}>{card}</Card>)}
        
      </div>
    </div>
  )
}

export default Dashboard;
