import React from 'react';
import { Button, ButtonProps } from 'antd';

type TAmountInputProps = ButtonProps & {
    label?: string;
};
const index: React.FC<TAmountInputProps> = ({ label, ...buttonProps }) => {
    const defaultButtonProps: ButtonProps = {
        ...buttonProps,
        type: 'default',
        size: 'large',
        className: `${buttonProps?.className} flex justify-center items-center h-10 mx-auto rounded-lg bg-[#f9a318] text-white font-bold text-sm border-0 hover:opacity-80`,
    };

    return (
        <>
            <Button {...defaultButtonProps}>{label}</Button>
        </>
    );
};
export default index;
