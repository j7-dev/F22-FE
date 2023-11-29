import { Form, Input } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { TPosition } from '../../List/types';
import Upload from '@/components/Admin/Upload';

const Banner = ({ position }: { position: TPosition }) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Upload />
                <Upload />
            </div>
            <Form.Item name={['position']} initialValue={position} hidden>
                <Input />
            </Form.Item>
        </>
    );
};

export default Banner;
