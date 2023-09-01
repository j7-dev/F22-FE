import React from 'react';
import { Input, Form } from 'antd';
import InputButton from './InputButton';

interface AmountInputProps {
    label?: string;
    itemName?: string;
    ifShowButton?: boolean;
    className?: string;
}
const index: React.FC<AmountInputProps> = ({
    label,
    itemName,
    ifShowButton = true,
    className,
}) => (
    // const form = Form.useFormInstance();

    <>
        {label && <p className="font-bold text-sm text-[#2B3240]">{label}</p>}

        <Form.Item name={itemName} className={className}>
            <Input prefix="¥" style={{ textAlign: 'right' }} />
        </Form.Item>
        {ifShowButton && <InputButton />}
    </>
);
export default index;
