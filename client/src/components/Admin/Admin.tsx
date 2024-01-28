
import { Button, Card, Dropdown, Input, MenuProps, Space, Table, TableProps } from 'antd';
import './Admin.css'
import { AdminAPI } from '../../api/AdminAPI';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserTable } from '../../models/userTable.model';
import { User } from '../../models/user.model';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteModal from '../modals/DeleteModal/DeleteModal';



function Admin() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([] as UserTable[]);
  const [ orgName, setOrgName ] = useState(user?.organization?.orgName)
  const [orgSaving, setOrgSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [areUsersLoading, setAreUsersLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();

  const openDeleteModal = (userid: number | undefined) => {
    setSelectedUserId(userid)
    console.log(userid)
    setIsDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
   };

  const columns: TableProps<UserTable>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
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
      render: (user: UserTable) => (
        <Dropdown menu={{ 
            items: [
                {
                    key: '1',
                    label: (
                        <a>
                            Edit
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a style={{color: "red"}} onClick={() => openDeleteModal(user.id)}>
                            Delete
                        </a>
                    ),
                }
            ]
        }} placement="bottom">
          <Button style={{width: "50%"}}><EllipsisOutlined /></Button>
        </Dropdown>
     )
    }

  ]


  useEffect(() => {
    fetchUsers()
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

   const fetchUsers = () => {
    setAreUsersLoading(true)
    AdminAPI.getUsersByOrg(user?.organization?.id).then(response => {
      const usersInTable: UserTable[] = []
      response.map((User: User) => {
        if(User.id === user?.id){
          return
        }
        let userEntry: UserTable = {
          id: User.id,
          role: User.role?.roleName,
          username: User.username,
          email: User.email
        }
        usersInTable.push(userEntry)
        
      })
      setUsers(usersInTable)
      setAreUsersLoading(false);
    }).catch(error => 
      console.log(error)
    )
   }
  
  return (
   <div className="wrapper">
      <h1 className="header">Organzation Administration</h1>
      { user?.role?.roleName === 'Systems Admin' ?
      <Card title="Organization Settings" className='org-management'>
        <div>
        <p className="org-name">Organization Name</p>
        <Space.Compact style= {{width: "100%"}}>
          <Input defaultValue={orgName} onChange={handleOrgNameChange} style={{ width: "30vw" }}/>
          <Button style={{ width: "8vw" }} type="primary" loading={orgSaving} onClick={changeOrgName}>Save</Button>
        </Space.Compact>
        </div>
      </Card>
      : null
      }
      <Card title="User Management" className='org-management' extra={<Button icon={<PlusOutlined />}></Button>}>
        <Table columns={columns} dataSource={users} loading={areUsersLoading}style={{width: "100%"}}/>
      </Card>
      <DeleteModal isModalOpen={isDeleteModalOpen} closeModal={closeDeleteModal} closeDeleteModal={closeDeleteModal} selectedUserId={selectedUserId} refetchUsers={fetchUsers}></DeleteModal>
   </div>
    
  )
}

export default Admin;
