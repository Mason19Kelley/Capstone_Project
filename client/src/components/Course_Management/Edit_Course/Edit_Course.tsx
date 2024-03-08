import React, { useEffect } from 'react';
import { Button, Card, ConfigProvider, Image, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Box, ThemeProvider } from '@mui/system'
import { CourseAPI } from '../../../api/CourseAPI';
import EditCourseModal from '../../modals/EditCourseModal/EditCourseModal';

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

  const tempModule = {
    moduleName : "temp",
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

  


function Edit_Course() {
  const {user, organization, setEditCourseContext } = useContext(AuthContext)
  
  const { id } = useParams();
  
  const [selectedCourse, setselectedCourse] = useState<course>(initialCourse);
  const [instructor, setInstructor] = useState<string>('')

  const [editCourseOpen, setisEditCourseOpen] = useState<boolean>(false);


  useEffect(() => {

    if(id && organization ){
      CourseAPI.getOneCourse(id, organization).then((data: any) => {
        const jsonInformation = JSON.parse(data['jsonInformation']);
        setInstructor(data['instructor']);
        setselectedCourse(jsonInformation);
      })
    }
  }, [])
  

  const addModule = (selectedCourse: any) => {
    const newModules = [...selectedCourse.modules, tempModule];
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  const deleteModule = (selectedCourse: any, module: any) => {
    const newModules = selectedCourse.modules.filter((mod: any) => mod.moduleName !== module.moduleName);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  const addContent = (selectedCourse: any, module: any) => {
    const newContent = [...module.content, tempContent];
    const newModules = selectedCourse.modules.map((mod: any) => mod.moduleName === module.moduleName ? { ...mod, content: newContent } : mod);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  const deleteContent = (selectedCourse: any, module: any, content: any) => {
    const newContent = module.content.filter((con: any) => con.contentType !== content.contentType);
    const newModules = selectedCourse.modules.map((mod: any) => mod.moduleName === module.moduleName ? { ...mod, content: newContent } : mod);
    setselectedCourse({ ...selectedCourse, modules: newModules });
  }

  const EditCourseInformation = () => {
    setisEditCourseOpen(true);
  }
  const closeEditModal = () => {
    setisEditCourseOpen(false);
   };

   const createQuiz = () => {
    setEditCourseContext('Create_Quiz');
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
                  {content['contentType']}
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
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => createQuiz()}>
                    <EditOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
                  <Button className='noHover' type="primary" style={{ width: '50px' }} onClick={() => addContent(selectedCourse, module)}>
                    <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                  </Button>
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

  const listModules = (id: any) => {
    console.log("here")
    console.log(initialCourse)
    return (
      <div>
      {id['modules'].map((module: any) => (
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
                    <Button className='noHover' style={{ width: '50px', display:'flex', verticalAlign: 'middle' }} onClick={() => addModule(selectedCourse)} >
                      <PlusOutlined style={{ color: 'black', verticalAlign: 'middle' }} />
                    </Button>
                  </div>
                </Box>
              </ThemeProvider>
              <EditCourseModal isModalOpen={editCourseOpen} closeModal={closeEditModal} courseName={selectedCourse['courseName']} instructorName={instructor}></EditCourseModal>
              <div>{listModules(selectedCourse)}</div>
              </div>
            </div>
  )
}

export default Edit_Course
