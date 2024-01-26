
import { Button, Card, Input, Space } from 'antd';
import './Admin.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Admin() {
  const { user } = useContext(AuthContext)
  
  return (
   <div className="wrapper">
      <h1 className="header">Organzation Administration</h1>
      <Card title="Organization Settings" className='org-management'>
        <div>
        <p className="org-name">Organization Name</p>
        <Space.Compact>
          <Input defaultValue="" style={{ width: "30vw" }}/>
          <Button style={{ width: "8vw" }}>Save</Button>
        </Space.Compact>
        </div>
      </Card>
      <Card style={{ width: '98%' }} className='user-management'>
        <h2 className='card-title'>User Management</h2>
      </Card>
   </div>
    
  )
}

export default Admin;
