
import { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import { CourseAPI } from '../../../api/CourseAPI';
import { AdminAPI } from '../../../api/AdminAPI';
import { User } from '../../../models/user.model';

interface UserOptions {
    label: string,
    value: number,
    selected: boolean
}


function AddUserModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; selectedCourse: string; orgId: number | undefined}) {
  const [ loading, setLoading ] = useState(false);
  const [ options, setOptions ] = useState<UserOptions[]>([]);
  const [ usersToAdd, setUsersToAdd ] = useState<number[]>([]);

  useEffect(() => {
    if (props.isModalOpen) {
      console.log(props.selectedCourse)
      setOptions([])
      CourseAPI.getUsersInCourse(props.selectedCourse).then((response: User[]) => {
        console.log(response)
        AdminAPI.getUsersByOrg(props.orgId).then((users: User[]) => {
          const userOptions = users.map(user =>  ({
                label: user.fullName ?? "John Smith",
                value: user.id ?? -1,
                selected: response.map(res => res.id).includes(user.id)
        }))
            
            console.log(userOptions)
            setOptions(userOptions)
        })
      })
    }
 }, [props.isModalOpen, props.selectedCourse]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveUsersInCourse = () => {
    setLoading(true)
    CourseAPI.addUserstoCourse(props.selectedCourse, usersToAdd).then(() => {
      setLoading(false)
      props.closeModal()
    })
    props.closeModal()
  }

  const handleChange = (value: string[]) => {
    console.log(value)
    console.log(options.filter(option => option.selected === true).map(user => user.label))
    setUsersToAdd(value.map(user => +user))
  };

  
  return (
    <Modal title='Add Users to Course' open={props.isModalOpen} onCancel={props.closeModal}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" className="save-button" loading={loading} onClick={saveUsersInCourse}>
          Save
        </Button>
      </div>
    ]}>
        {options.length > 0 && (
          <div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Select Users"
              defaultValue={options.filter(option => option.selected === true).map(user => user.label)}
              onChange={handleChange}
              options={options}
            />
          </div>
        )}
    </Modal>
    
  )
}

export default AddUserModal;
