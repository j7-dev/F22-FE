import React from 'react';
import { InputNumber, Form, FormItemProps, InputNumberProps, Button, ButtonProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const QUICK_BUTTON_VALUES = [100, 1000, 10000, 100000, 1000000];

const index: React.FC<{
    formItemProps?: FormItemProps;
    inputNumberProps?: InputNumberProps;
    inputNumberMax?: string | number;
    quickButtonProps?: {
        symbol?: string;
        className?: string;
        buttonProps?: ButtonProps;
        closeButtonIcon?: React.ReactNode;
    };
}> = ({
    formItemProps,
    inputNumberProps,
    inputNumberMax,
    quickButtonProps = {
        className: 'grid grid-cols-2 lg:grid-cols-5 gap-4',
        buttonProps: {
            type: 'default',
            className: 'py-5 h-full w-full font-medium text-xl text-[#9680EA] bg-[#F8F9FF] border-transparent hover:bg-primary hover:text-white',
        },
        closeButtonIcon: <CloseOutlined />,
    },
}) => {
    const form = Form.useFormInstance();
    // 取得 amount Field 的即時數值
    const watchAmount: number = Form.useWatch(formItemProps?.name, form);

    const handleClick = (value: number) => {
        const newAmount = Number(watchAmount) + Number(value);
        form.setFieldsValue({ amount: newAmount });
    };

    return (
        <div>
            <Form.Item {...formItemProps} className="depositAmount">
                <InputNumber
                    min={0}
                    className=""
                    bordered={false}
                    controls={false}
                    formatter={(value: string | number | undefined) => {
                        const number = Number(value);
                        const max = Number(inputNumberMax);
                        if (number > max) {
                            return `${max}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        } else {
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }
                    }}
                    parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, ''))}
                    {...inputNumberProps}
                />
                {/* <InputNumber
                    onKeyUp={(e) => {
                        const value = e.target.value;
                    		const pattern = /^[0-9]*$/;
                    		pattern.test(value)
                        console.log('🚀 ~ value:', value);
                    }}
                /> */}
            </Form.Item>
            <div className={quickButtonProps.className}>
                {QUICK_BUTTON_VALUES.map((value) => (
                    <Button
                        {...quickButtonProps.buttonProps}
                        key={value}
                        onClick={() => {
                            handleClick(value);
                        }}
                    >
                        {`${inputNumberProps?.prefix || ''} `}
                        <SimpleAmount amount={Number(value)} />
                    </Button>
                ))}
                {/* <Button
                    {...quickButtonProps.buttonProps}
                    onClick={() => {
                        form.resetFields(['amount']);
                    }}
                    icon={quickButtonProps.closeButtonIcon}
                /> */}
            </div>
        </div>
    );
};
export default index;
