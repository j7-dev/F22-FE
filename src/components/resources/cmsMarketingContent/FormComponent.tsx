import { Form, FormProps } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { TPosition } from './List/types';
import Modal from './position/modal/form';
import Banner from './position/banner/form';

const FormComponent: React.FC<{
    formType: 'create' | 'edit';
    formProps: FormProps;
    handler: () => void;
    formLoading?: boolean;
    position: TPosition;
}> = ({ formProps, handler, position }) => {
    const mapping = {
        MODAL: <Modal position={position} />,
        BANNER: <Banner position={position} />,
    };

    return (
        <>
            <Form {...formProps} onFinish={handler} layout="vertical">
                {mapping?.[position as keyof typeof mapping]}
            </Form>
        </>
    );
};

export default FormComponent;
