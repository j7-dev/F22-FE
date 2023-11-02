import { Form, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';

// const DEPOSIT_METHOD = [
//     { name: 'CodePay', value: 'codePay' },
//     { name: 'Transfer', value: 'transfer' },
// ];

const index = () => {
    const { t } = useTranslation();
    const { data: identity } = useGetIdentity<TMe>();
    const DEPOSIT_METHOD = identity?.allow_payments?.map((item) => ({ name: item }));

    const form = Form.useFormInstance();
    const handleClick = (value: string) => () => {
        form.setFieldsValue({ depositMethod: value });
    };
    const isSelect = form.getFieldValue('depositMethod');
    return (
        <>
            <div className="w-full my-4 text-center">
                <span className="text-sm sm:text-2xl font-bold text-black">{t('Deposit Method')}</span>
            </div>
            <Form.Item
                name={['depositMethod']}
                rules={[
                    {
                        required: true,
                        message: 'Please Select Deposit Method!',
                    },
                ]}
                noStyle
            >
                <Input hidden />
            </Form.Item>
            <div className="flex flex-nowrap sm:gap-4 gap-2 mb-8">
                {DEPOSIT_METHOD?.map((item) => (
                    <div className="w-full">
                        <Button key={item.name} onClick={handleClick(item.name)} className={`${isSelect === item.name ? 'bg-[#9680EA] text-white' : 'bg-[#F8F9FF] text-[#9680EA]'} col-span-1 w-full h-10 sm:h-[65px] sm:text-xl text-base font-bold border-[#9680EA] hover:text-white hover:bg-[#9680EA]`}>
                            {t(item.name)}
                        </Button>
                        {item.name === 'CODEPAY' ? (
                            <a href="http://www.codepay.co.kr/" target="_blank" className="block underline text-[#9680EA] text-xs font-medium w-full text-center py-1">
                                {t('No CodePay yet? Download instantly.')}
                            </a>
                        ) : (
                            ''
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default index;
