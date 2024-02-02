
import { useEffect, useState } from 'react';
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
    AdminAPI.updateUser(updatedUser).then(() => {
      setLoading(false)
      props.refetchUsers()
      props.closeModal()
    })
    props.closeModal()
  }

  function isValidEmail() {
    return /\S+@\S+\.\S+/.test(email);
   }

   const canSubmit = () => {
    return isValidEmail() && fullName.length > 0 && role.length > 0
   }
  
  return (
    <Modal title="Edit User" open={props.isModalOpen} onCancel={props.closeModal}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" className="save-button" loading={loading} onClick={saveUser} disabled={!canSubmit()}>
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
            {!isValidEmail() && email.length > 0 ? <p style={{color: "red"}}>You must submit a valid email</p> : <></>}
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
