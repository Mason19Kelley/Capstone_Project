import React, { useContext, useEffect, useState } from 'react';
import { contentContext } from '../../../../context/contentContext';
import { Button, Card, Input, Typography, message } from 'antd';
import { CourseAPI } from '../../../../api/CourseAPI';
import { AuthContext } from '../../../../context/AuthContext';
import { DeleteOutlined } from '@ant-design/icons';
import { FileAPI } from '../../../../api/FileAPI';

function Edit_Media() {
    const { contentID } = useContext(contentContext);
    const { user, setEditCourseContext } = useContext(AuthContext);
    const [jsonInformation, setJsonInformation] = useState<any>({});
    const information = JSON.parse(contentID);
    const [description, setDescription] = useState(' ');

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (information && user?.organization?.id) {
            CourseAPI.getOneCourse(information.course, user.organization.id)
                .then((data: any) => {
                    if (description == ' ') {
                        const jsonInformation = JSON.parse(data?.jsonInformation || '{}');
                        setJsonInformation(jsonInformation);
                        const desc = getInformation(jsonInformation.modules, information.content, information.module);
                    
                        setDescription(desc.Description);
                    }
                })
                .catch(error => {
                    console.error('Error fetching course:', error);
                });
        }
    }, [information]);

    useEffect(() => {
        console.log(update)
        if(jsonInformation && jsonInformation.modules && jsonInformation.modules.length > 0 && update){
            console.log(jsonInformation)
            CourseAPI.updateCourseJSON(information.course, jsonInformation);
        }
    }
    , [jsonInformation]);


    const getInformation = (modules: any[], contentName: any, moduleID: any) => {
        if (Array.isArray(modules) && modules.length > 0) {
            const module = modules.find((module: any) => module.moduleID === moduleID);
            if (module && Array.isArray(module.content) && module.content.length > 0) {
                return module.content.find((content: any) => content.fileName === contentName) || null;
            }
        }
        return null;
    };

    //pulls description from the json 
    const pullInformation = () => {
        const description = getInformation(jsonInformation.modules, information.content, information.module);
        return (
            <div style={{fontFamily: 'Oswald', fontSize: '1.3em'}}>
                Description: {description ? description.Description : 'Description not found.'}
            </div>
        );
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const updateContent = async () => {
        setUpdate(true);
        const updatedModules = jsonInformation.modules.map((module: { content: any[]; }) => {
            const updatedContent = module.content.map(content => {
                if (content.fileName === information.content) {
                    return { ...content, Description: description };
                }
                return content;
            });
            return { ...module, content: updatedContent };
        });
        console.log(updatedModules)
        setJsonInformation({ ...jsonInformation, modules: updatedModules });
        
        message.success('Content updated successfully.');

        setTimeout(() => {
            setEditCourseContext('Edit_Course');
        }, 500);
        // try {
        //     await CourseAPI.updateCourseJSON(information.courseName, jsonInformation);
        //     console.log("Course JSON updated successfully");
        // } catch (error) {
        //     console.error('Error updating course JSON:', error);
        // }
    };

    const deleteContent = () => {
        if (!jsonInformation) return;

        FileAPI.deleteFile(information.content);

        const updatedModules = jsonInformation.modules.map((module: { content: any[]; }) => {
            const updatedContent = module.content.filter(content => content.fileName !== information.content);
            return { ...module, content: updatedContent };
        });

        setJsonInformation({ ...jsonInformation, modules: updatedModules });

        message.success('Content deleted successfully.');

        setTimeout(() => {
            setEditCourseContext('Edit_Course');
        }, 500);
    };

    return (
        <div>
            <Card
                style={{
                    textAlign: 'left',
                    padding: '2%',
                    color: 'black',
                    background: '#D0E2F0', 
                    borderBlockWidth: '1vw', 
                    borderBlockColor: '#B1D0E7',
                }}
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography.Title level={3} className='dashboardText' style={{ margin: 0 }}>
                            {information.content}
                        </Typography.Title>
                        <Button className='noHover' style={{ background: '#F34B4B', width: '50px', marginLeft: 'auto' }} onClick={deleteContent}>
                            <DeleteOutlined style={{ color: 'white' }} />
                        </Button>
                    </div>
                }
            >
                <div>
                <span style={{fontFamily: 'Oswald', fontSize: '1.6em', }} className='font-semibold text-base text-start w-[100%]'>Description</span> 
                    <Input  style={{marginTop: '2%'}} value={description} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <Button style={{background: '#F34B4B', color: 'white', marginTop: '2%'}} onClick={updateContent}>Update</Button>
                </div>    
            </Card>
        </div>
    );
}

export default Edit_Media;
