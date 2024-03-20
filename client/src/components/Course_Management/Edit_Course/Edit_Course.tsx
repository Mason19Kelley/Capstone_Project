import React, { useEffect } from 'react';
import { Button, Card, ConfigProvider, Image, Typography, Popover } from 'antd';
import { useParams } from 'react-router-dom';
import { UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Box, ThemeProvider } from '@mui/system'
import { CourseAPI } from '../../../api/CourseAPI';
import EditCourseModal from '../../modals/EditCourseModal/EditCourseModal';
import { v4 as uuidv4 } from 'uuid';
import { contentContext } from '../../../context/contentContext';
import { FileAPI } from '../../../api/FileAPI';

interface course {
  courseName : string,
  modules :
      {
          moduleName : string,
          content :
              {
                  contentType : string | null,
                  fileType : string | null,
                  fileLocation : string | null,
                  fileName : string | null,
                  quizID : number | null,
                  Description : string | null
              }[]
      }[]
}

function Edit_Course() {
 const uniqueID = uuidv4();
  
  const initialCourse: course = {
    courseName : 'temp',
    modules : [
        {
            moduleName : 'temp1',
            content : [
                {
                    contentType : null,
                    fileType : null,
                    fileLocation :null,
                    fileName : null,
                    quizID : null,
                    Description : null
                }]
        }]
    }
    
    const { contentID, setContentID } = useContext(contentContext);

  const {user, organization, EditCourseContext, setEditCourseContext} = useContext(AuthContext)
  const [selectedCourse, setselectedCourse] = useState<course>(initialCourse);

  const { id } = useParams();
  
  const [instructor, setInstructor] = useState<string>('')

  const [editCourseOpen, setisEditCourseOpen] = useState<boolean>(false);
  const [popOverOpen, setPopOverOpen] =  useState<any | null>(null);;

    
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
    
      const tempContent = {
        contentType : "temp",
        fileType : null,
        fileLocation :null,
        fileName : null,
        quizID : null,
        Description : null
      }
    


  useEffect(() => {
    
    if(id && user?.organization?.id){
      CourseAPI.getOneCourse(id, user.organization.id).then((data: any) => {
        const jsonInformation = JSON.parse(data['jsonInformation']);
        setInstructor(data['instructor']);
        setselectedCourse(jsonInformation);
      })
    }
  }, [])
  
  useEffect(() => {
    updateJSON();
  }, [selectedCourse]);
  
  const updateJSON = () => {
    CourseAPI.updateCourseJSON(selectedCourse.courseName, selectedCourse);
  }


  const addModule = () => {
    setselectedCourse(prevCourse => {
      const newModules = [...prevCourse.modules, tempModule];
      return { ...prevCourse, modules: newModules };
    });
  }


  const deleteModule = (selectedCourse: any, module: any) => {
    console.log(module.moduleID)
    const newModules = selectedCourse.modules.filter((mod: any) => mod.moduleID !== module.moduleID);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  const addContent = (selectedCourse: any, module: any) => {
    const newContent = [...module.content, tempContent];
    const newModules = selectedCourse.modules.map((mod: any) => mod.moduleName === module.moduleName ? { ...mod, content: newContent } : mod);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  const deleteContent = (selectedCourse: any, module: any, content: any) => {
    const newContent = module.content.filter((con: any) => con.fileName !== content.fileName);
    const newModules = selectedCourse.modules.map((mod: any) => mod.moduleName === module.moduleName ? { ...mod, content: newContent } : mod);
    setselectedCourse({ ...selectedCourse, modules: newModules });

  }

  const EditCourseInformation = () => {
    setisEditCourseOpen(true);
  }
  const closeEditModal = () => {
    setisEditCourseOpen(false);
   };


   const createMedia= (module: any) => {
      setContentID(module.moduleID)
      console.log(contentID)
      setEditCourseContext('Create_Media');
    }

  const createQuiz = () => {
    setEditCourseContext('Create_Quiz');
  }


    const createCourseContent = (module: any) => {
        setPopOverOpen(popOverOpen === module ? null : module);
    };

    const hide = () => {
        setPopOverOpen(null);
    }

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
            padding: '2%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography.Title level={3} style={{ textAlign: 'left', margin: 0 }}>
                <div className='dashboardText'>
                  {content['fileName']}
                </div>
              </Typography.Title>
              <div style={{ display: 'flex' }}>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => null}>
                  <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
                <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => deleteContent(selectedCourse, module, content)}>
                  <DeleteOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                </Button>
              </div>
          </div>
        </Card>
    )
  }

  const displayModules = (module: any) => {
    return (

      <div style={{gap:'10px', justifyContent: 'space-between' }}>
        <div className='courses'>
          <Card
            style={{
              width: '100%',
              borderRadius: 8,
              backgroundColor: 'white', // Adjust the background color as needed
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2%',
              
            }}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={3} style={{ textAlign: 'left', margin: 0 }}>
                  <div className='dashboardText'>{module['moduleName']}</div>
                </Typography.Title>
                <div style={{ display: 'flex' }}>
                  <Button className='noHover' type="primary" style={{ width: '50px' }} >
                    <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
                  <Popover
                    key={module}
                    content={
                      <div style={{display: 'flex'}} >
                        <Button style={{flex: 1}} onClick={() => createQuiz()} >
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
                    <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => createCourseContent(module)}>
                        <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                    </Button>
                </Popover>
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => deleteModule(selectedCourse, module)}>
                    <DeleteOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
                </div>
              </div>
            }
            bordered={true}
          >
          {module['content'].map((content: any) => (
              displayContent(module, content)
          ))}
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


  
  return (
            <div>
              <Typography.Title level={2} style={{ textAlign: 'left' }}>
                <div className='dashboardText'>Edit Course</div>
              </Typography.Title>
              <div>
              <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
                <Box
                  sx={{
                    width: 1,
                    height: 75,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '2%',
                    color: 'white'
                  }}
                >
                  <Typography.Title level={3} style={{ textAlign: 'left' }}>
                    <div className='dashboardText'>{selectedCourse['courseName']}</div>
                    <div style={{fontSize:'15px'}}>{instructor}</div>
                  </Typography.Title>
                  <div style = {{display:'flex'}}>
                    <Button className='noHover' style={{ width: '50px', display:'flex', verticalAlign: 'middle'  }} onClick={() => EditCourseInformation()}>
                      <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                    </Button>
                    <Button className='noHover' style={{ width: '50px', display:'flex', verticalAlign: 'middle' }} onClick={() => addModule()} >
                      <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                    </Button>
                  </div>
                </Box>
              </ThemeProvider>
              <EditCourseModal isModalOpen={editCourseOpen} closeModal={closeEditModal} courseName={selectedCourse['courseName']} instructorName={instructor} courseJSON = {selectedCourse}></EditCourseModal>
              <div>{listModules(selectedCourse)}</div>
              </div>
            </div>
            
  )
}

export default Edit_Course
