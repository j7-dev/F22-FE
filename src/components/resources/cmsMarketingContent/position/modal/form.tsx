import { Form, Input } from 'antd';
import 'react-quill/dist/quill.snow.css';
import RichEditor from '@/components/form/RichEditor';
import { TPosition } from '../../List/types';
import { useTranslation } from 'react-i18next';

const Modal = ({ position }: { position: TPosition }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Form.Item className="w-full" label={t('title')} name={['title']} rules={[{ required: true, message: 'value is required' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <Form.Item name={['position']} initialValue={position} hidden>
                    <Input />
                </Form.Item>
            </div>

            <RichEditor
                formItemProps={{
                    className: 'w-full',
                    name: ['content'],
                }}
            />
        </>
    );
};

export default Modal;
