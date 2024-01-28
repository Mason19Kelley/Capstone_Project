
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { AdminAPI } from '../../../api/AdminAPI';



function DeleteModal(props: { closeDeleteModal: () => void; isModalOpen: boolean | undefined; closeModal: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined; selectedUserId: number | undefined; refetchUsers: () => void; }) {
  const [ loading, setLoading ] = useState(false);

  const deleteUser = () => {
    setLoading(true)
    AdminAPI.deleteUser(props.selectedUserId).then(response => {
      setLoading(false)
      props.closeDeleteModal()
      props.refetchUsers()
    }).catch(error => console.log(error))
  }

  const closeModal = () => {
    props.closeDeleteModal()
  }
  
  return (
    <Modal title="Delete User" open={props.isModalOpen}  onCancel={props.closeModal} 
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" danger loading={loading} onClick={deleteUser}>
          Delete
        </Button>
      </div>
    ]}>
        <p>Are you sure you want to delete this User? This action cannot be undone.</p>

    </Modal>
    
  )
}

export default DeleteModal;
