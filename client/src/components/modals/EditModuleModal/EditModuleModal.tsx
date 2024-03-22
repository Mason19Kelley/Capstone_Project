import { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { CourseAPI } from '../../../api/CourseAPI';

function EditModuleModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; ModuleName: string | undefined; moduleID:any; courseJSON: any; }) {
  const [ModuleName, setModuleName] = useState("")
  const [courseJSON, setCourseJSON] = useState<any>({})
  

  useEffect(() => {
    console.log(props.ModuleName, props.courseJSON)
    //setOldCourseName(CourseName)
    if (props.isModalOpen) {
        setModuleName(props.ModuleName || "");
        setCourseJSON(props.courseJSON || {});
    }
 }, [props.isModalOpen, props.ModuleName, props.courseJSON]);

  const closeModal = () => {
    props.closeModal()
  }

  const updateModuleName = (jsonData: any, moduleID: string, newModuleName: string) => {
    const updatedModules = jsonData.modules.map((module: { moduleID: string; }) => {
        if (module.moduleID === moduleID) {
            return { ...module, moduleName: newModuleName };
        }
        return module;
    });

    return { ...jsonData, modules: updatedModules };
};

  const saveCourseInformation = () => {
    const updatedCourseJSON = updateModuleName(courseJSON, props.moduleID, ModuleName);
    console.log(updatedCourseJSON)
    //console.log(props.courseName)
    //courseJSON.moduleName = ModuleName
    console.log(ModuleName)
    
    console.log(courseJSON.modules)
    CourseAPI.updateCourseJSON(courseJSON.courseName, updatedCourseJSON)
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
            <p>Module Name</p>
            <Input value={ModuleName} onChange={e => setModuleName(e.target.value)}/>
        </div>
    </Modal>
  )
}

export default EditModuleModal;
