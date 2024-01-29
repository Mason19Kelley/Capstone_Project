
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { AdminAPI } from '../../../api/AdminAPI';
import { UserTable } from '../../../models/userTable.model';



function EditUserModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; selectedUser: UserTable | undefined; refetchUsers: () => void; }) {
  const [ loading, setLoading ] = useState(false);
  const [fullName, setFullName] = useState("")
  const [userId, setUserId] = useState<number | undefined>();
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    if (props.isModalOpen) {
      setFullName(props.selectedUser?.fullName || "");
      setUserId(props.selectedUser?.id)
      setEmail(props.selectedUser?.email || "");
      setRole(props.selectedUser?.role || "");
    }
 }, [props.isModalOpen, props.selectedUser]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveUser = () => {
    const updatedUser: UserTable = {
      id: userId,
      fullName: fullName,
      email: email,
      role: role
    }
    setLoading(true)
    AdminAPI.updateUser(updatedUser).then(response => {
      setLoading(false)
      props.refetchUsers()
      props.closeModal()
    })
    props.closeModal()
  }
  
  return (
    <Modal title="Edit User" open={props.isModalOpen} onCancel={props.closeModal}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" className="save-button" loading={loading} onClick={saveUser}>
          Save
        </Button>
      </div>
    ]}>
        <div>
            <p>Full Name</p>
            <Input value={fullName} onChange={e => setFullName(e.target.value)}/>
        </div>
        <div>
            <p>Email</p>
            <Input value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
            <p>Role</p>
            <Select
                value={role}
                onChange={e => setRole(e)}
                style={{ width: "100%"}}
                options={[{value: "Administrator", label: "Administrator"}, { value: 'User', label: 'User' }]}
            />
        </div>
    </Modal>
    
  )
}

export default EditUserModal;
