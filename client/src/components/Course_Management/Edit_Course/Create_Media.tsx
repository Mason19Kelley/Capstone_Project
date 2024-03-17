import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Card, Upload, message, UploadProps, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { FileAPI } from '../../../api/FileAPI';

function Create_Media() {
    const [file, setFile] = useState<File | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);

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
            console.log(file)
            console.log(formData)
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
            <button onClick={handleSubmit}>Submit</button>
        </Card>
    );
}

export default Create_Media;


        // <Card>
        //     <Dragger {...props}>
        //         <p className="ant-upload-drag-icon">
        //             <InboxOutlined />
        //         </p>
        //         <p className="ant-upload-text">Click or drag file to this area to upload</p>
        //         <p className="ant-upload-hint">
        //             Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        //             banned files.
        //         </p>
                
        //     </Dragger>
        //     <button type="submit">Submit</button>
        // </Card>

        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <h1>File Upload</h1>
        //         <input type="file" onChange={handleFileChange} />
        //         <button type="submit">Submit</button>
        //     </form>
//         // </div> 
//     )
// }

// export default Create_Media;