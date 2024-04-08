import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card, Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FileAPI } from '../../../../api/FileAPI';
import { CourseAPI } from '../../../../api/CourseAPI';
import { AuthContext } from '../../../../context/AuthContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { contentContext } from '../../../../context/contentContext';
import type { GetProp, UploadFile, UploadProps } from 'antd';


function Create_Media() {
    const [fileName, setFile] = useState<File | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const [description, setDescription] = useState<string>('');
    const [jsonInformation, setJsonInformation] = useState<any>(null);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { contentID } = useContext(contentContext);
    const [uploading, setUploading] = useState(false);

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


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
            console.log(fileList)
            console.log(fileName)
        })
        }
      }, [])



    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        if (!fileList.length) {
          message.error('Please select a file.');
          return;
        }
    
        try {
          setUploading(true);
    
          const formData = new FormData();

            formData.append('file', fileList[0]);

          console.log(formData)
          
          const response = await FileAPI.uploadFile(formData);
    
          // Update jsonInformation and course information as needed
          const moduleToEdit = jsonInformation.modules.find((module: any) => module.moduleID === contentID);
          const type = fileList[0].type.split('/')[1];
          tempMediaJSON.fileType = type;
          tempMediaJSON.fileName = fileList[0].name;
          tempMediaJSON.Description = description;
          moduleToEdit.content.push(tempMediaJSON);


          console.log('Upload response:', response);
    
          if (id) {
            await CourseAPI.updateCourseJSON(id, jsonInformation);
          }
    
          message.success('Upload successful.');
          setFileList([]);
          setDescription('');
        } catch (error) {
          console.error('Upload error:', error);
          message.error('Upload failed.');
        } finally {
          setUploading(false);
        }
      };
    
      const props: UploadProps = {
        name: 'file',
        maxCount: 1,
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = [...fileList];
          newFileList.splice(index, 1);
          setFileList(newFileList);
        },
        beforeUpload: (file) => {
            console.log(file)
            setFileList([file]);
            setFile(file);
            return false;
        },
        fileList,
      };
    
      return (
        <Card>
          <Upload {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibited from uploading company data or other banned files.
            </p>
          </Upload>
          <br /><br />
          <p>Description:</p>
          <textarea
            value={description}
            onChange={handleChange}
            style={{
              background: 'white',
              outlineColor: 'black',
              outlineWidth: 1,
              outlineStyle: 'solid',
              border: 'none',
              padding: '5px',
              width: '50%',
              height: '100px',
              verticalAlign: 'top',
              textAlign: 'justify',
              resize: 'vertical',
            }}
          />
          <br /><br />
          <Button
            onClick={handleSubmit}
            disabled={fileList.length === 0 || uploading}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Submit'}
          </Button>
        </Card>
      );
}

export default Create_Media;
