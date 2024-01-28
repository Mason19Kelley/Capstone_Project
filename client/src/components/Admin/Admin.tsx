
import { Button, Card, Input, Space, Table, TableProps } from 'antd';
import './Admin.css'
import { AdminAPI } from '../../api/AdminAPI';
import { SetStateAction, useContext, useEffect, useState } from 'react';
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
  const [ orgName, setOrgName ] = useState(user?.organization?.orgName)
  const [orgSaving, setOrgSaving] = useState(false);


  useEffect(() => {
    AdminAPI.getUsersByOrg(user?.organization?.id).then(response => {
      setUsers(response)
      console.log(response)
 
    }).catch(error => 
      console.log(error)
    )
  }, [])

  const handleOrgNameChange = (event: { target: { value: SetStateAction<string | undefined>; }; }) => {
    setOrgName(event.target.value);
   };

   const changeOrgName = () => {
    if(!orgSaving){
      setOrgSaving(true)
      AdminAPI.updateOrgName({id: user?.organization?.id, orgName: orgName}).then(response => {
        console.log(response)
        setOrgSaving(false)
      }).catch(error => 
        console.log(error)
      )
    }
    
   }
  
  return (
   <div className="wrapper">
      <h1 className="header">Organzation Administration</h1>
      <Card title="Organization Settings" className='org-management'>
        <div>
        <p className="org-name">Organization Name</p>
        <Space.Compact>
          <Input defaultValue={orgName} onChange={handleOrgNameChange} style={{ width: "30vw" }}/>
          <Button style={{ width: "8vw" }} loading={orgSaving} onClick={changeOrgName}>Save</Button>
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
