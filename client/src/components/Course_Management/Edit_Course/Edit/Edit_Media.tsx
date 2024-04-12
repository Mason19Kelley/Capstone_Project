//imports
import { useContext, useEffect, useState } from 'react';
import { contentContext } from '../../../../context/contentContext'; 
import { Button, Card, Typography, message } from 'antd';
import { CourseAPI } from '../../../../api/CourseAPI';
import { AuthContext } from '../../../../context/AuthContext';
import { DeleteOutlined } from '@ant-design/icons';
import { FileAPI } from '../../../../api/FileAPI';

function Edit_Media () {
    //variables
    const { contentID } = useContext(contentContext);
    const { user, setEditCourseContext } = useContext(AuthContext);
    const [jsonInformation, setJsonInformation] = useState<any>({});
    const information = JSON.parse(contentID);

    // fetches course json
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
    }, [information]);

    useEffect(() => {
        updateJSON()
    }, [jsonInformation])

    // updates json with the new json
    const updateJSON = () => {
        CourseAPI.updateCourseJSON(jsonInformation.courseName, jsonInformation);
      }

    // pulls information from the json, finds the correct content in array
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
            <div>
                Description: {description ? description.Description : 'Description not found.'}
            </div>
        );
    };

    // deletes content
    const deleteContent = () => {
        if (!jsonInformation) return;
        
        //deletes file from GCP
        FileAPI.deleteFile(information.content)
        
        const updatedModules = jsonInformation.modules.map((module: { content: any[]; }) => {
            const updatedContent = module.content.filter(content => content.fileName !== information.content);
            return { ...module, content: updatedContent };
        });

        console.log(updatedModules)

        // Update the jsonInformation state with the modified modules
        setJsonInformation({ ...jsonInformation, modules: updatedModules });

        // Show success message
        message.success('Content deleted successfully.');

        // used to change components
        // time delay needed to make things more smooth
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
