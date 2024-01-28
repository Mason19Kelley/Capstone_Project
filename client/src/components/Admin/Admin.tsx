
import { Button, Card, Input, Space, Table, TableProps } from 'antd';
import './Admin.css'
import { AdminAPI } from '../../api/AdminAPI';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface DataType {
  id: number;
  name: string;
  role: string;
  email: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Actions',
    key: 'action',
    render: () => <p>...</p>
  }
]

function Admin() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([]);


  useEffect(() => {
    AdminAPI.getUsersByOrg(user?.organization?.id).then(response => {
      setUsers(response)
      console.log(response)
 
    }).catch(error => 
      console.log(error)
    )
  }, [])
  
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
      <Card title="User Management" className='org-management'>
        <Table columns={columns} dataSource={users}/>
      </Card>
   </div>
    
  )
}

export default Admin;
