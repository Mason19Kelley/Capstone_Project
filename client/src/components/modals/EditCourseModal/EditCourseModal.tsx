import { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { CourseAPI } from '../../../api/CourseAPI';

function EditCourseModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; courseName: string | undefined; instructorName: string | undefined; courseJSON: any; }) {
  const [CourseName, setCourseName] = useState("")
  const [instructorName, setinstructorName] = useState("")
  const [courseJSON, setCourseJSON] = useState<any>({})
  

  useEffect(() => {
    if (props.isModalOpen) {
        setCourseName(props.courseName || "");
        setinstructorName(props.instructorName || "");
        setCourseJSON(props.courseJSON || {});
    }
 }, [props.isModalOpen, props.courseName, props.instructorName, props.courseJSON]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveCourseInformation = () => {
    courseJSON.courseName = CourseName
    console.log(courseJSON)
    CourseAPI.updateCourse(CourseName, props.courseName ?? "", instructorName, props.instructorName ?? "")
    props.closeModal()
  }

  
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
            <Input value={instructorName} onChange={e => setinstructorName(e.target.value)}/>
        </div>
    </Modal>
  )
}

export default EditCourseModal;
