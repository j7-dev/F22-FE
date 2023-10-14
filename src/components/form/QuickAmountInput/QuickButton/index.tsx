import React from 'react';
import { Button, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useGetSiteSetting } from '@/hooks';
import getSymbolFromCurrency from 'currency-symbol-map';

const QUICK_BUTTON_VALUES = [100, 1000, 10000, 100000, 1000000];

const index: React.FC = () => {
    const { default_currency } = useGetSiteSetting();
    const form = Form.useFormInstance();
    // 取得 amount Field 的即時數值
    const watchAmount: number = Form.useWatch(['amount'], form);

    const handleClick = (value: number) => {
        const newAmount = Number(watchAmount) + Number(value);
        form.setFieldsValue({ amount: newAmount });
    };
    return (
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_BUTTON_VALUES.map((value) => (
                <Button
                    key={value}
                    type="default"
                    className="w-full font-bold text-sm bg-[#F2F2F2] border-transparent hover:border-primary"
                    onClick={() => {
                        handleClick(value);
                    }}
                >
                    {`${getSymbolFromCurrency(default_currency.toUpperCase())} ${value.toLocaleString()}`}
                </Button>
            ))}
            <Button
                type="default"
                className="w-full font-bold text-sm bg-[#F2F2F2] border-transparent hover:border-primary"
                onClick={() => {
                    form.resetFields(['amount']);
                }}
                icon={<CloseOutlined />}
            />
        </div>
    );
};

export default index;
