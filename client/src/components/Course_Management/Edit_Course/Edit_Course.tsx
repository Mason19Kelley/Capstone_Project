import  { useEffect } from 'react';
import { Button, Card,  Typography, Popover, Tooltip } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { UserAddOutlined, PlusOutlined, EditOutlined, DeleteOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { Box, ThemeProvider } from '@mui/system'
import { CourseAPI } from '../../../api/CourseAPI';
import EditCourseModal from '../../modals/EditCourseModal/EditCourseModal';
import { v4 as uuidv4 } from 'uuid';
import { contentContext } from '../../../context/contentContext';
import { FileAPI } from '../../../api/FileAPI';
import  EditModuleModal  from '../../modals/EditModuleModal/EditModuleModal';
import AddUserModal from './AddUserModal';


// interface for course json
interface course {
  courseName : string,
  modules :
      {
          moduleName : string,
          moduleID: string,
          content :
              {
                  contentType : string | null,
                  fileType : string | null,
                  fileName : string | null,
                  quizID : number | null,
                  Description : string | null
              }[]
      }[]
}

function Edit_Course() {
 let uniqueID = uuidv4();
  
 // creates new course with temporary information
  const initialCourse: course = {
    courseName : 'temp',
    modules : [
        {
            moduleName : 'temp1',
            moduleID : uniqueID,
            content : [
                {
                    contentType : null,
                    fileType : null,
                    fileName : null,
                    quizID : null,
                    Description : null
                }]
        }]
    }
    
  const { setContentID, setCourseName } = useContext(contentContext);
  const {user, setEditCourseContext} = useContext(AuthContext)
  const [selectedCourse, setselectedCourse] = useState<course>(initialCourse);
  const { id } = useParams();
  const [instructor, setInstructor] = useState<string>('')
  const [cid, setCid] = useState<number>(0);
  const [editCourseOpen, setisEditCourseOpen] = useState<boolean>(false);
  const [popOverOpen, setPopOverOpen] =  useState<any | null>(null);;
  const [ editModuleOpen, setEditModuleOpen ] = useState<boolean>(false);
  const [selectedModuleID, setSelectedModuleID] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);


    uniqueID = uuidv4();
      const tempModule = {
        moduleName : "temp",
        moduleID : uniqueID,
        content : [
          {
            contentType : null,
            fileType : null,
            fileLocation :null,
            fileName : null,
            quizID : null,
            Description : null
          }]
      }
    
  useEffect(() => {
    
    if(id && user?.organization?.id){
      CourseAPI.getOneCourse(id, user.organization.id).then((data: any) => {
        console.log(data)
        const jsonInformation = JSON.parse(data['jsonInformation']);
        setInstructor(data['instructor']);
        setselectedCourse(jsonInformation);
        setCid(data.cid);
      })
    }
  }, [])
  
  useEffect(() => {
    updateJSON();
  }, [selectedCourse]);
  
  const updateJSON = () => {
    CourseAPI.updateCourseJSON(selectedCourse.courseName, selectedCourse);
  }

  // adds module to course
  const addModule = () => {
    setselectedCourse(prevCourse => {
      const newModules = [...prevCourse.modules, tempModule];
      return { ...prevCourse, modules: newModules };
    });
  }

  // deletes module from course json
  const deleteModule = (selectedCourse: any, module: any) => {
    const newModules = selectedCourse.modules.filter((mod: any) => mod.moduleID !== module.moduleID);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  // deletes content from module in course json
  // deletes file from GCP
  const deleteContent = (selectedCourse: any, module: any, content: any) => {
    FileAPI.deleteFile(content.fileName);
    const newContent = module.content.filter((con: any) => con.fileName !== content.fileName);
    const newModules = selectedCourse.modules.map((mod: any) => mod.moduleName === module.moduleName ? { ...mod, content: newContent } : mod);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  // opens edit course modal
  const EditCourseInformation = () => {
    setisEditCourseOpen(true);
  }
  const closeEditModal = () => {
    setisEditCourseOpen(false);
   };

   // opens edit module modal
   const editModuleInformation = (module: any) => {
    setSelectedModuleID(module.moduleID)
    setEditModuleOpen(true);
   }
   const closeEditModuleModal = () => {
    setEditModuleOpen(false);
   };

   // function that changes the context to create media component
  const createMedia= (module: any) => {
    setContentID(module.moduleID)
    setEditCourseContext('Create_Media');
    }

    // function that changes the context to create quiz component
  const createQuiz = (module: any) => {
    setCourseName(selectedCourse.courseName);
    setContentID(module.moduleID)
    setEditCourseContext('Create_Quiz');
  }

  // popover to display content options
  const createCourseContent = (module: any) => {
    setPopOverOpen(popOverOpen === module ? null : module);
  };

  // function that changes the context to edit media component
  // determines if the content is media or quiz and changes context 
  // to the appropriate component
  const EditContent = (module: any, content: any) => {
    if(content.contentType === 'Media'){
      const information = {
        course: selectedCourse.courseName,
        module: module.moduleID,
        content: content.fileName
      }
      setContentID(JSON.stringify(information))
      setEditCourseContext('Edit_Media');
    }
    else if(content.contentType === 'Quiz'){
      setContentID(content.quizID)
      setEditCourseContext('Edit_Quiz');
    }
    
  }

  // function used to display content within the course json
  const displayContent = (module: any, content: any) => {

    return (
        <Card
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography.Title level={3} style={{ textAlign: 'left', margin: 0 }}>
                <div className='dashboardText'>
                  {content['fileName']}
                </div>
              </Typography.Title>
              <div style={{ display: 'flex', gap: '2px' }}>
                <Tooltip placement='bottom' title="Edit Content">
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => EditContent(module,content)} icon={<EditOutlined style={{ color: 'black' }} />}>
                  </Button>
                </Tooltip>
                <Tooltip placement='bottom' title="Delete Content">
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => deleteContent(selectedCourse, module, content)} icon={<DeleteOutlined style={{ color: 'black' }} />}>
                  </Button>
                </Tooltip>
                
              </div>
          </div>
        </Card>
    )
  }

  // function used to display modules within the course json
  const displayModules = (module: any) => {
    return (

      <div style={{gap:'10px', justifyContent: 'space-between' }}>
        <div className='courses'>
          <Card className="course-modules-cards"
            style={{
              width: '100%',
              borderRadius: 8,
              backgroundColor: 'lightgrey', // Adjust the background color as needed
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2%',
              
            }}
            bodyStyle={{ padding: "20px 0" }}
            headStyle={{ padding: 0}}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={3} style={{ textAlign: 'left', margin: 0 }}>
                  <div className='dashboardText'>{module['moduleName']}</div>
                </Typography.Title>
                <div style={{ display: 'flex', gap: "2px" }}>
                  <Tooltip placement='bottom' title='Edit Module Information'>
                    <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => editModuleInformation(module)} icon={<EditOutlined style={{ color: 'black' }} />}>
                    </Button>
                  </Tooltip>
                  <Popover
                    key={module}
                    content={
                      <div style={{display: 'flex'}}>
                        <Button style={{flex: 1}} onClick={() => createQuiz(module)} >
                            Quiz
                        </Button>
                        <Button style={{flex: 1}} onClick={() => createMedia(module)}>
                            Media
                        </Button>
                      </div>
                    }
                    title="Add Content"
                    trigger="click"
                    open={popOverOpen === module}
                    onOpenChange={(visible) => createCourseContent(visible ? module : null)}
                    >
                    <Tooltip placement='bottom' title="Add Course Content">
                      <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => createCourseContent(module)} icon={<PlusOutlined style={{ color: 'black' }} />}>
                      </Button>
                    </Tooltip>
                </Popover>
                  <Tooltip placement='bottom' title="Delete Module">
                    <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => deleteModule(selectedCourse, module)} icon={<DeleteOutlined style={{ color: 'black' }} />}>
                    </Button>
                  </Tooltip>
                  {selectedModuleID === module.moduleID && <EditModuleModal isModalOpen={editModuleOpen} closeModal={closeEditModuleModal} ModuleName={module['moduleName']} moduleID={module['moduleID']} courseJSON = {selectedCourse}></EditModuleModal>}
                </div>
              </div>
            }
            bordered={true}
          >
            <div className="flex flex-col gap-[1px] w-[100%] ">
              {module['content'].map((content: any) => (
                  displayContent(module, content)
              ))}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const listModules = (course: any) => {
    
    return (
      <div>
      {course['modules'].map((module: any) => (
        displayModules(module)
      ))}
      
      </div>
    )
  }

  // opens add user modal
  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  }

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
   };


  
  return (
            <div>
              <Typography.Title level={2} style={{ textAlign: 'left' }}>
              <div className="flex flex-row justify-between">
                <div className='dashboardText'>Edit Course</div>
                <Link to={`/courses/${cid}`}>
                  <Button type="primary" icon={<PlaySquareOutlined />}>
                    Go to Course
                  </Button>
                </Link>
                
              </div>
              </Typography.Title>
              <div>
              <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
                <Card>
                  <div className="flex justify-between">
                    <Typography.Title level={3} style={{ textAlign: 'left' }}>
                      <div className='dashboardText'>{selectedCourse['courseName']}</div>
                      <div style={{fontSize:'15px'}}>Instructor: {instructor}</div>
                    </Typography.Title>
                    <div style = {{display:'flex', gap: "2px"}}>
                      <Tooltip placement='bottom' title="Edit Course Information">
                        <Button className='noHover' style={{ width: '50px' }} onClick={() => EditCourseInformation()} icon={<EditOutlined style={{ color: 'black' }} />}>
                        </Button>
                      </Tooltip>
                      <Tooltip placement='bottom' title="Add Users">
                        <Button className='noHover' style={{ width: '50px'  }} onClick={() => openAddUserModal()} icon={<UserAddOutlined style={{ color: 'black' }} />}>
                        </Button>
                      </Tooltip>
                      <Tooltip placement='bottom' title="Add New Module">
                        <Button className='noHover' style={{ width: '50px' }} onClick={() => addModule()} icon={<PlusOutlined style={{ color: 'black' }} />}>
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <div>{listModules(selectedCourse)}</div>
                </Card>
              </ThemeProvider>
              <EditCourseModal isModalOpen={editCourseOpen} closeModal={closeEditModal} courseName={selectedCourse['courseName']} instructorName={instructor} courseJSON = {selectedCourse}></EditCourseModal>

              </div>
              <AddUserModal closeModal={closeAddUserModal} isModalOpen={isAddUserModalOpen} selectedCourse={selectedCourse.courseName} orgId={user?.organization?.id}></AddUserModal>
            </div>
            
            
  )
}

export default Edit_Course
