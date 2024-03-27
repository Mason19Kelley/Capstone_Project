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

    // const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    //     const { status, originFileObj } = info.file;
    //     if (status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //     }
    //     if (status === 'done') {
    //         console.log(info.file);
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //         if (originFileObj) {
    //             setFile(originFileObj); // Update file state with the uploaded file
    //         } else {
    //             console.error('Origin file object is undefined');
    //         }
    //     } else if (status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    //     setFileList(info.fileList);
    // };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        if (!fileList.length) {
          message.error('Please select a file.');
          return;
        }
    
        try {
          setUploading(true);
    
          const formData = new FormData();
          console.log(fileList)

          fileList.forEach((file) => {
            // Assuming 'file' is of type UploadFile, check and convert if necessary
            const convertedFile = file.originFileObj instanceof File ? file.originFileObj : file as File;
            formData.append('files[]', convertedFile);
          });

    
          console.log(formData.getAll('files[]'))
          
          const response = await FileAPI.uploadFile(formData);
    
          // Update jsonInformation and course information as needed
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
          setFileList([file]);
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

    // const handleSubmit = async (event: FormEvent) => {
    //     console.log(fileName)
    //     console.log(fileList)
    //     const formData = new FormData();
    //     fileList.forEach((file) => {
    //         formData.append('files[]', file as FileType);
    //     });
        
    //     setUploading(true)


    //     console.log(jsonInformation)
    //     event.preventDefault();
    //     if (!fileName) {
    //             console.error('No file selected');
    //             return;
    //     }
    //     try {
    //         const moduleToEdit = jsonInformation.modules.find((module: any) => module.moduleID === contentID);
    //         tempMediaJSON.fileType = fileName.type;
    //         tempMediaJSON.fileName = fileName.name;
    //         tempMediaJSON.Description = description;
    //         moduleToEdit.content.push(tempMediaJSON);
    //         const response = await FileAPI.uploadFile(formData);
    //         console.log('Upload response:', response);
    //         if (id){
    //             CourseAPI.updateCourseJSON(id, jsonInformation);
    //         }
    //         setUploading(false)
    //         // Perform further actions if needed
    //     } catch (error) {
    //         console.error('Upload error:', error);
    //     }
    // };


    // const props: UploadProps = {
    //     name: 'file',
    //     maxCount: 1,
    //     onRemove: (file) => {
    //         const index = fileList.indexOf(file);
    //         const newFileList = fileList.slice();
    //         newFileList.splice(index, 1);
    //         setFileList(newFileList);
            
    //       },
    //       beforeUpload: (file) => {
    //         setFileList([...fileList, file]);
    //         const newFileList = fileList.slice();
    //         setFile(newFileList[0]);
    //         console.log(fileName)
    //         return false;
    //       },
    //       fileList,
    // };

    // return (
    //     <Card>
    //         <Upload {...props}>
    //             <p className="ant-upload-drag-icon">
    //                 <InboxOutlined />
    //             </p>
    //             <p className="ant-upload-text">Click or drag file to this area to upload</p>
    //             <p className="ant-upload-hint">
    //                 Support for a single or bulk upload. Strictly prohibited from uploading company data or other
    //                 banned files.
    //             </p>
    //         </Upload>
    //         <br></br>
    //         <br></br>
    //         Description: <textarea 
    //             value = {description}
    //             onChange={handleChange}
    //             style={{
    //                 background: 'white', 
    //                 outlineColor: 'black', 
    //                 outlineWidth: 1,
    //                 outlineStyle: 'solid',
    //                 border: 'none', // To remove default input border
    //                 padding: '5px', // Adjust padding as needed
    //                 width: '50%',
    //                 height: '100px',
    //                 verticalAlign: 'top',
    //                 textAlign: 'justify',
    //                 resize: 'vertical',
    //             }}  />
    //         <div></div>
    //         <Button 
    //             onClick={handleSubmit}
    //             disabled = {fileList.length === 0}
    //             loading = {uploading}
    //         >Submit</Button>
    //     </Card>
    // );
}

export default Create_Media;
