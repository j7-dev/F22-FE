import React from 'react';
import { Button, Form } from 'antd';

const index: React.FC = () => {
    const form = Form.useFormInstance();
    // 取得 amount Field 的即時數值
    const watchAmount = Form.useWatch(['amount'], form);

    const handleClick = (value: number) => {
        const newAmount = Number(watchAmount) + Number(value);
        form.setFieldsValue({ amount: newAmount });
    };
    return (
        <div className="walletAmountButton w-full flex flex-wrap gap-1">
            <Button
                type="default"
                className="w-[calc(100%/2-4px)] md:w-[calc(100%/3-4px)] mb-1.5 border-transparent font-bold text-sm text-[#666666] hover:border-[#F9A318]"
                style={{ background: '#F2F2F2' }}
                onClick={() => {
                    handleClick(100);
                }}
            >
                ¥ 100
            </Button>
            <Button
                type="default"
                className="w-[calc(100%/2-4px)] md:w-[calc(100%/3-4px)] mb-1.5 border-transparent font-bold text-sm text-[#666666] hover:border-[#F9A318]"
                style={{ background: '#F2F2F2' }}
                onClick={() => {
                    handleClick(1000);
                }}
            >
                ¥ 1,000
            </Button>
            <Button
                type="default"
                className="w-[calc(100%/2-4px)] md:w-[calc(100%/3-4px)] mb-1.5 border-transparent font-bold text-sm text-[#666666] hover:border-[#F9A318]"
                style={{ background: '#F2F2F2' }}
                onClick={() => {
                    handleClick(10000);
                }}
            >
                ¥ 10,000
            </Button>
            <Button
                type="default"
                className="w-[calc(100%/2-4px)] md:w-[calc(100%/3-4px)] mb-1.5 border-transparent font-bold text-sm text-[#666666] hover:border-[#F9A318]"
                style={{ background: '#F2F2F2' }}
                onClick={() => {
                    handleClick(100000);
                }}
            >
                ¥ 100,000
            </Button>
            <Button
                type="default"
                className="w-[calc(100%/2-4px)] md:w-[calc(100%/3-4px)] mb-1.5 border-transparent font-bold text-sm text-[#666666] hover:border-[#F9A318]"
                style={{ background: '#F2F2F2' }}
                onClick={() => {
                    handleClick(1000000);
                }}
            >
                ¥ 1,000,000
            </Button>
            <Button
                type="default"
                className="w-[calc(100%/2-4px)] md:w-[calc(100%/3-4px)] mb-1.5 font-bold text-sm text-[#666666] "
                // style={{ background: '#F2F2F2' }}
                onClick={() => {
                    form.resetFields(['amount']);
                }}
            >
                X
            </Button>
        </div>
    );
};

export default index;
