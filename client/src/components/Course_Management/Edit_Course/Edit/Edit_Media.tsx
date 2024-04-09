import React, { useContext, useEffect, useState } from 'react';
import { contentContext } from '../../../../context/contentContext'; 
import { Button, Card, Typography, message } from 'antd';
import { CourseAPI } from '../../../../api/CourseAPI';
import { AuthContext } from '../../../../context/AuthContext';
import { DeleteOutlined } from '@ant-design/icons';
import { FileAPI } from '../../../../api/FileAPI';
import { json } from 'react-router-dom';

function Edit_Media () {
    const { contentID } = useContext(contentContext);
    const { user, setEditCourseContext } = useContext(AuthContext);

    const [jsonInformation, setJsonInformation] = useState<any>({});
    const information = JSON.parse(contentID);

    useEffect(() => {
        if (information && user?.organization?.id) {
            CourseAPI.getOneCourse(information.course, user.organization.id)
                .then((data: any) => {
                    const jsonInformation = JSON.parse(data?.jsonInformation || '{}');
                    setJsonInformation(jsonInformation);
                })
                .catch(error => {
                    console.error('Error fetching course:', error);
                });
        }
    }, [information, jsonInformation]);

    useEffect(() => {
        updateJSON();
    })

    const updateJSON = () => {
        CourseAPI.updateCourseJSON(jsonInformation.courseName, jsonInformation);
      }

    const getInformation = (modules: any[], contentName: any, moduleID: any) => {
        if (Array.isArray(modules) && modules.length > 0) {
            const module = modules.find((module: any) => module.moduleID === moduleID);
            if (module && Array.isArray(module.content) && module.content.length > 0) {
                return module.content.find((content: any) => content.fileName === contentName) || null;
            }
        }
        return null;
    };

    const pullInformation = () => {
        const description = getInformation(jsonInformation.modules, information.content, information.module);
        return (
            <div>
                Description: {description ? description.Description : 'Description not found.'}
            </div>
        );
    };

    
    

    const deleteContent = () => {
        if (!jsonInformation) return;

        FileAPI.deleteFile(information.content)

        const updatedModules = jsonInformation.modules.map((module: { content: any[]; }) => {
            // Filter out the content with fileName "classes.txt"
            const updatedContent = module.content.filter(content => content.fileName !== "classes.txt");
            return { ...module, content: updatedContent };
        });

        // Update the jsonInformation state with the modified modules
        setJsonInformation({ ...jsonInformation, modules: updatedModules });

        // Show success message
        message.success('Content deleted successfully.');

        setTimeout(() => {
            setEditCourseContext('Edit_Course');
            }, 500);
    }

    return (
        <div>
            <Card
                style={{
                    textAlign: 'left',
                    padding: '2%',
                    color: 'black'
                }}
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography.Title level={3} className='dashboardText' style={{ margin: 0 }}>
                            {information.content}
                        </Typography.Title>
                        <Button className='noHover' style={{ width: '50px', marginLeft: 'auto' }} onClick={deleteContent}>
                            <DeleteOutlined style={{ color: 'black' }} />
                        </Button>
                    </div>
                }
            >
                {pullInformation()}
            </Card>
        </div>
    )
}

export default Edit_Media;
