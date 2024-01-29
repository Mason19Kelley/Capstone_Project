
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';



function EditUserModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; }) {
  const [ loading, setLoading ] = useState(false);
  const [fullName, setFullName ] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")

  const closeModal = () => {
    props.closeModal()
  }

  const saveUser = () => {
    setLoading(true)
    console.log(fullName)
    console.log(email)
    console.log(role)
    props.closeModal()
  }
  
  
  return (
    <Modal title="Create User" open={props.isModalOpen} onCancel={props.closeModal}
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
            <Input onChange={(e) => setFullName(e.target.value)}/>
        </div>
        <div>
            <p>Email</p>
            <Input onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
            <p>Role</p>
            <Select
                onChange={(e) => setRole(e)}
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
