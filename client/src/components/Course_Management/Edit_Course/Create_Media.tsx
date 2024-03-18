import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card, Upload, message, UploadProps, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { FileAPI } from '../../../api/FileAPI';
import { CourseAPI } from '../../../api/CourseAPI';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';


function Create_Media() {
    const [file, setFile] = useState<File | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const [description, setDescription] = useState<string>('');
    const [jsonInformation, setJsonInformation] = useState<any>(null);
    const { user } = useContext(AuthContext);
    const { id } = useParams();

    const tempMediaJSON = {
        contentType : "Media",
        fileType : "temp",
        fileName : "Sample Video",
        quizID : null,
        Description : "This is a sample video"
    }

    useEffect(() => {
        if(id && user?.organization?.id){
          CourseAPI.getOneCourse(id, user.organization.id).then((data: any) => {
            setJsonInformation(JSON.parse(data['jsonInformation']))
          })
        }
      }, [])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const { status, originFileObj } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            console.log(info.file);
            message.success(`${info.file.name} file uploaded successfully.`);
            if (originFileObj) {
                setFile(originFileObj); // Update file state with the uploaded file
            } else {
                console.error('Origin file object is undefined');
            }
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        setFileList(info.fileList);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            tempMediaJSON.fileType = file.type;
            tempMediaJSON.fileName = file.name;
            tempMediaJSON.Description = description;
            console.log(tempMediaJSON);
            console.log(jsonInformation);
            console.log(formData);
            const response = await FileAPI.uploadFile(formData);
            console.log('Upload response:', response);
            // Perform further actions if needed
        } catch (error) {
            console.error('Upload error:', error);
        }
    };


    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange: handleFileChange,
        maxCount: 1,
    };

    return (
        <Card>
            <Upload {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Upload>
            <br></br>
            <br></br>
            Description: <textarea 
                value = {description}
                onChange={handleChange}
                style={{
                    background: 'white', 
                    outlineColor: 'black', 
                    outlineWidth: 1,
                    outlineStyle: 'solid',
                    border: 'none', // To remove default input border
                    padding: '5px', // Adjust padding as needed
                    width: '50%',
                    height: '100px',
                    verticalAlign: 'top',
                    textAlign: 'justify',
                    resize: 'vertical'
                }}  />
            <div></div>
            <button onClick={handleSubmit}>Submit</button>
        </Card>
    );
}

export default Create_Media;
