import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
// import { API_URL } from '@/utils';
// import { axiosInstance } from '@/providers/strapi-v4/utils/axios';

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'files',
    multiple: false,
    // action: async (file) => {
    //     console.log('⭐  file:', file);
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('files', file);
    //         const result = await axiosInstance.post(`${API_URL}/api/upload`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         console.log('⭐  result:', result);

    //         return undefined;
    //     }
    //     return undefined;
    // },
    onChange: async (info) => {
        console.log('⭐  info:', info);
        const file = info.fileList[0]?.originFileObj;
        console.log('⭐  file:', file);

        const { status } = info.file;
        console.log('⭐  status:', status);
        // if (status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const MyUpload: React.FC = () => (
    <>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.</p>
        </Dragger>
        {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal> */}
    </>
);

export default MyUpload;
