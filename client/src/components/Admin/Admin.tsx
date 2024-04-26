
import { Button, Card, Dropdown, Input, Space, Table, TableProps, Tooltip } from 'antd';
import './Admin.css'
import { AdminAPI } from '../../api/AdminAPI';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserTable } from '../../models/userTable.model';
import { User } from '../../models/user.model';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteModal from '../modals/DeleteModal/DeleteModal';
import EditUserModal from '../modals/EditUserModal/EditUserModal';
import CreateUserModal from '../modals/CreateUserModal/CreateUserModal';



function Admin() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([] as UserTable[]);
  const [ orgName, setOrgName ] = useState(user?.organization?.orgName)
  const [orgSaving, setOrgSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [areUsersLoading, setAreUsersLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserTable | undefined>();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [textBoxValue, setTextBoxValue] = useState('');

  const openDeleteModal = (user: UserTable | undefined) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
   };

   const openEditModal = (user: UserTable | undefined) => {
    setSelectedUser(user)
    setIsEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
   };

   const openCreateModal = () => {
    setIsCreateModalOpen(true);
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
   };

  const columns: TableProps<UserTable>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
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
                        <a onClick={() => openEditModal(user)}>
                            Edit
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a style={{color: "red"}} onClick={() => openDeleteModal(user)}>
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

   const pullLogs = () => {
    AdminAPI.pullLogs().then(response => {
      if (response.length > 0) {
        const firstLog = response[0];
        const logProperties = Object.keys(firstLog);

        const logsInfo = response.map((log: { [x: string]: any; }) =>
          logProperties.map((property) => `${property}: ${log[property]}`).join(', ')
        );

        setTextBoxValue(logsInfo.join('\n'));
      }
    }).catch(error => 
      console.log(error)
    )
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
          fullName: User.fullName,
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
   <div className="admin-wrapper">
      <h1 className="header">Organization Administration</h1>
      { user?.role?.roleName === 'Systems Admin' ?
      <Card title=<span style={{fontFamily: 'Oswald', fontSize: '1.3em'}}>Organization Settings</span> className='org-management'>
        <div>
        <p className="org-name">Organization Name</p>
        <Space.Compact style= {{width: "100%"}}>
          <Input defaultValue={orgName} onChange={handleOrgNameChange} style={{ width: "30vw" }}/>
          <Button style={{ width: "8vw", background: '#F34B4B'}} type="primary" loading={orgSaving} onClick={changeOrgName} className="rename-button">Save</Button>
        </Space.Compact>
        </div>
      </Card>
      : null
      }
      <Card title=<span style={{fontFamily: 'Oswald', fontSize: '1.3em'}}>User Management</span> className='org-management' extra={<Tooltip placement='bottom' title="Create User"><Button style={{background: '#F34B4B', color: 'white'}} icon={<PlusOutlined />} onClick={openCreateModal}></Button></Tooltip>}>
        <Table columns={columns} dataSource={users} loading={areUsersLoading}style={{width: "100%"}}/>
      </Card>
      <DeleteModal isModalOpen={isDeleteModalOpen} closeModal={closeDeleteModal} closeDeleteModal={closeDeleteModal} selectedUserId={selectedUser?.id} refetchUsers={fetchUsers}></DeleteModal>
      <EditUserModal isModalOpen={isEditModalOpen} closeModal={closeEditModal} selectedUser={selectedUser} refetchUsers={fetchUsers}></EditUserModal>
      <CreateUserModal isModalOpen={isCreateModalOpen} closeModal={closeCreateModal} refetchUsers={fetchUsers}/>
      <Card title=<span style={{fontFamily: 'Oswald', fontSize: '1.3em'}}>Logs</span> className='org-management'>
      <textarea
        value={textBoxValue}
        style={{
          width: '100%',
          height: '100px',
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
        readOnly // Set the readOnly attribute
      />
         <Button style={{background: '#F34B4B'}} type="primary" onClick={pullLogs} className='rename-button'>Pull Logs</Button>
      </Card>
   </div>
    
  )
}

export default Admin;
