
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { AdminAPI } from '../../../api/AdminAPI';



function EditUserModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; }) {
  const [ loading, setLoading ] = useState(false);

  const closeModal = () => {
    props.closeModal()
  }
  
  return (
    <Modal title="Edit User" open={props.isModalOpen}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" loading={loading}>
          Create
        </Button>
      </div>
    ]}>

    </Modal>
    
  )
}

export default EditUserModal;
