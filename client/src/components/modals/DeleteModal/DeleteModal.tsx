
import React, { useState } from 'react';
import { Button, Modal } from 'antd';



function DeleteModal(props: { isModalOpen: boolean | undefined; closeModal: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined; }) {
  
  
  return (
    <Modal title="Basic Modal" open={props.isModalOpen}  onCancel={props.closeModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    
  )
}

export default DeleteModal;
