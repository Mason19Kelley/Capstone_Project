import { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { CourseAPI } from '../../../api/CourseAPI';
import { AdminAPI } from '../../../api/AdminAPI';
import { User } from '../../../models/user.model';


interface UserOptions {
  label: string,
  value: number,
  selected: boolean
}

function EditCourseModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; courseName: string | undefined; instructorName: string | undefined; courseJSON: any;orgId: number | undefined; }) {
  const [CourseName, setCourseName] = useState("")
  const [instructorName, setinstructorName] = useState("")
  const [courseJSON, setCourseJSON] = useState<any>({})
  const [ options, setOptions ] = useState<UserOptions[]>([]);

  

  useEffect(() => {
    if (props.isModalOpen) {
        setCourseName(props.courseName || "");
        setinstructorName(props.instructorName || "");
        setCourseJSON(props.courseJSON || {});
        setOptions([])

        AdminAPI.getAdminByOrg(props.orgId).then((response: User[]) => {
          const userOptions = response.map(user =>  ({
                      label: user.fullName?? instructorName,
                      value: user.id ?? -1,
                      selected: user.fullName === instructorName              }))
          setOptions(userOptions)
        })

    }
 }, [props.isModalOpen, props.courseName, props.instructorName, props.courseJSON]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveCourseInformation = () => {
    courseJSON.courseName = CourseName
    CourseAPI.updateCourse(CourseName, props.courseName ?? "", instructorName, props.instructorName ?? "")
    props.closeModal()
  }

  const handleChange = (value: string[]) => {
    const selectedUser = options.filter(option => option.value === Number(value)).map(user => user.label);
    setinstructorName(selectedUser[0])
  };

  return (
    <Modal title="Edit Course Information" open={props.isModalOpen} onCancel={props.closeModal}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" className="save-button" onClick={saveCourseInformation} >
          Save
        </Button>
      </div>
    ]}>
        <div>
            <p>Course Name</p>
            <Input value={CourseName} onChange={e => setCourseName(e.target.value)}/>
        </div>
        <div>
          <p>Instructor</p>
          {options.length > 0 && (
            <div>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Select Users"
                defaultValue={options.filter(option => option.selected === true).map(user => user.label)}
                onChange={handleChange}
                options={options}
              />
            </div>
          )}
        </div>
    </Modal>
  )
}

export default EditCourseModal;
