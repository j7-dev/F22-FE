import React from 'react';
import { InputNumber, Form } from 'antd';
import InputButton from './InputButton';

type TAmountInputProps = {
    label?: string;
    itemName?: string | string[];
    ifShowButton?: boolean;
    className?: string;
};

const index: React.FC<TAmountInputProps> = ({ label, itemName, ifShowButton = true, className }) => {
    return (
        // TODO 幣別symbol 可以考慮寫變數
        <>
            <Form.Item
                label={label}
                name={itemName}
                className={className}
                initialValue={0}
                rules={[
                    {
                        type: 'number',
                        min: 1,
                        message: 'Please input amount greater than 0 !',
                    },
                ]}
            >
                <InputNumber min={0} className="w-full text-right" prefix="¥" controls={false} formatter={(value: number | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))} />
            </Form.Item>
            {ifShowButton && <InputButton />}
        </>
    );
};
export default index;
