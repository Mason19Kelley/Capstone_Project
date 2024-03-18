
import { useEffect, useState, useContext } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { AdminAPI } from '../../../api/AdminAPI';
import { AuthContext } from '../../../context/AuthContext';



function EditUserModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; refetchUsers: () => void; }) {
  const { user } = useContext(AuthContext)
  const [ loading, setLoading ] = useState(false);
  const [fullName, setFullName ] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")

  useEffect(() => {
    if (props.isModalOpen) {
      setFullName("");
      setEmail("");
      setRole("");
    }
 }, [props.isModalOpen]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveUser = () => {
    setLoading(true)
    AdminAPI.createUser({fullName: fullName, email: email, role: role, orgId: user?.organization?.id}).then(() => {
      props.refetchUsers()
      props.closeModal()
    }).catch((error) => {
      console.log(error)
      props.closeModal()
    })
    
  }

  function isValidEmail() {
    return /\S+@\S+\.\S+/.test(email);
   }

   const canSubmit = () => {
    return isValidEmail() && fullName.length > 0 && role.length > 0
   }
  
  
  return (
    <Modal title="Create User" open={props.isModalOpen} onCancel={props.closeModal}
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
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)}/>
        </div>
        <div>
            <p>Email</p>
            <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
            {!isValidEmail() && email.length > 0 ? <p style={{color: "red"}}>You must submit a valid email</p> : <></>}
        </div>
        <div>
            <p>Role</p>
            <Select
                onChange={(e) => setRole(e)}
                value={role}
                style={{ width: "100%"}}
                options={[{value: "Administrator", label: "Administrator"}, { value: 'User', label: 'User' }]}
            />
        </div>
        <div>
            <p>A set password email will be sent to the user.</p>
        </div>
    </Modal>
    
  )
}

export default EditUserModal;
