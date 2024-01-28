
import React, { useState } from 'react';
import { Button, Modal } from 'antd';



function DeleteModal(props: { closeDeleteModal: () => void; isModalOpen: boolean | undefined; closeModal: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined; selectedUserId: number | undefined; }) {
  const [ loading, setLoading ] = useState(false);

  const deleteUser = () => {
    setLoading(true)
    console.log(props.selectedUserId)
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
