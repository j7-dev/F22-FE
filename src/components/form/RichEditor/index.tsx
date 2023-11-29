import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API_URL } from '@/utils';
import { axiosInstance } from '@/providers/strapi-v4/utils/axios';
import { Form, FormItemProps } from 'antd';

const index = ({ formItemProps }: { formItemProps: FormItemProps }) => {
    const quillRef = useRef<ReactQuill>(null);
    const quillObj = quillRef?.current?.getEditor() as any;

    useEffect(() => {
        if (quillObj) {
            const toolbar = quillObj.getModule('toolbar');
            toolbar.addHandler('image', imageHandler);
        }
    }, [quillObj]);

    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;

            const range = quillObj?.getSelection();

            if (file) {
                const formData = new FormData();
                formData.append('files', file);
                const responseUpload = await axiosInstance.post(`${API_URL}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (quillObj) {
                    const src = responseUpload?.data?.[0]?.url;
                    (quillObj as any)?.editor?.insertEmbed(range!.index, 'image', `${API_URL}${src}`);
                }
            }
        };
    };

    const modules = {
        toolbar: {
            container: [[{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }], [{ size: [] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], ['link', 'image', 'video'], ['clean'], [{ align: [] }]],
        },
    };

    return (
        <Form.Item {...formItemProps}>
            <ReactQuill ref={quillRef} theme="snow" className="h-[500px]" modules={modules} formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image']} />
        </Form.Item>
    );
};

export default index;
