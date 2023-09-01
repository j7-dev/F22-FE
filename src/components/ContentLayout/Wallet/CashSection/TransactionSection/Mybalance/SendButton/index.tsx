import React from 'react';
import { Form, Button } from 'antd';

interface AmountInputProps {
    label?: string;
    className?: string;
}
const index: React.FC<AmountInputProps> = ({ label, className }) => {
    const form = Form.useFormInstance();

    const handleClick = () => {
        // form.validateFields()
        //     .then((values) => {
        //         console.log('Form values:', values);
        //     })
        //     .catch((errorInfo) => {
        //         console.log('Failed:', errorInfo);
        //     });
        // console.log(`form.getFieldsValue(true):${form.getFieldsValue(true)}`);
        const formValues = form.getFieldsValue(true);
        console.log('form.getFieldsValue(true):', formValues);
    };
    return (
        <>
            <Form.Item className={className}>
                <Button
                    type="default"
                    className="flex justify-center items-center h-10 mx-auto rounded-lg bg-[#f9a318] text-white font-bold text-sm border-0 hover:opacity-80"
                    onClick={() => {
                        handleClick();
                    }}
                >
                    {label}
                </Button>
            </Form.Item>
        </>
    );
};
export default index;
