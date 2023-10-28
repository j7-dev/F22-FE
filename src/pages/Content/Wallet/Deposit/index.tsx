import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { useGetIdentity, useCreate } from '@refinedev/core';
import { TMe } from '@/types';
import { useModal } from '@refinedev/antd';
import { CODEPAY_APP_URL, CODEPAY_SIMPLE_ADDRESS_TO } from '@/utils';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';
import Amount from '@/components/Admin/Amount';
import BonusDetails from './BonusDetails';
import QRCode from 'qrcode';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useShowPc } from '@/hooks/useShowPc';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const { data: identity } = useGetIdentity<TMe>();
    const user_id = identity?.id;
    const CODEPAY_IDENTIFIER = `user_id:${user_id}`;
    const showPc = useShowPc();

    const { modalProps, show, close } = useModal();
    const watchAmount = Form.useWatch(['amount'], form);

    const [qrcode, setQrcode] = React.useState('');

    const generateQR = async (text: string) => {
        try {
            const url = await QRCode.toDataURL(text);
            setQrcode(url);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClick = () => {
        form.validateFields()
            .then(() => {
                //電腦版顯示Modal，手機版直接開啟網址
                if (showPc) {
                    show();

                    const qrString = `codp:${CODEPAY_SIMPLE_ADDRESS_TO}?type=payment&identifier=userid${user_id}&amount=${watchAmount}`;
                    generateQR(qrString);
                } else {
                    handleOpenUrl();
                }
            })
            .catch((errorInfo) => {
                console.log('errorInfo', errorInfo);
            });
    };

    const { default_currency, default_amount_type } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());

    const codePayUrl = `${CODEPAY_APP_URL}/payment?type=payment&simpleAddress=${CODEPAY_SIMPLE_ADDRESS_TO}&tag=smtbet7&identifier=${CODEPAY_IDENTIFIER}&amount=${watchAmount}`;
    const handleOpenUrl = () => {
        window.open(codePayUrl, '_blank');
    };

    const { mutate: create, isLoading } = useCreate();

    const handleNotify = () => {
        const values = form.getFieldsValue();
        create(
            {
                resource: 'transaction-records',
                values: {
                    ...values,
                    type: 'DEPOSIT',
                    title: `Deposit by user ${user_id}`,
                    status: 'PENDING',
                    user: user_id,
                    by: 'USER',
                    currency: default_currency,
                    amount_type: default_amount_type,
                },
            },
            {
                onSuccess: () => {
                    form.resetFields();
                    close();
                    notification.success({
                        key: 'deposit',
                        message: `Submit $${values.amount} deposit notification Success`,
                        description: 'Please wait for the administrator to review, we will reply in 3 working days.',
                        duration: null,
                    });
                },
            },
        );
    };

    //監聽Form的值，都填寫完畢後，使Button可以點擊
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setIsDisabled(false);
            },
            () => {
                setIsDisabled(true);
            },
        );
    }, [values]);

    //取得id = header的元素高度
    const header = document.getElementById('header');
    const headerHeight = header?.clientHeight;
    return (
        <div style={{ minHeight: `calc(100vh - ${headerHeight}px - 72px)` }} className="flex flex-col justify-between bg-white px-8 py-[42px] rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <div className="min-h-[180px]">
                <span className="text-black font-bold text-2xl">{t('Deposit')}</span>
                <Form form={form} initialValues={{ amount: '0' }} layout="vertical">
                    <QuickAmountInput
                        formItemProps={{
                            label: <span className="mt-1 text-sm text-[#828282] font-medium">{t('Amount to transfer')}</span>,
                            name: ['amount'],
                            rules: [
                                {
                                    type: 'number',
                                    min: 1,
                                    message: 'Please input amount greater than 0 !',
                                },
                            ],
                        }}
                        inputNumberProps={{
                            prefix: symbol,
                        }}
                        //隱藏快速按鈕
                        quickButtonProps={{
                            className: 'hidden',
                        }}
                    />
                    <BonusDetails />
                    {/* <Alert
                        message={<span className="font-semibold">{t("Don't have Code Pay account?")}</span>}
                        description={
                            <div>
                                <a href="http://www.codepay.co.kr/" target="_blank">
                                    <img className="w-[100px] my-2" src="http://www.codepay.co.kr/img/logo.png" />
                                </a>
                                <p>
                                    go to{' '}
                                    <a href="http://www.codepay.co.kr/" target="_blank">
                                        http://www.codepay.co.kr/
                                    </a>{' '}
                                    to register an account.
                                </p>
                            </div>
                        }
                        className="my-6"
                        type="info"
                        showIcon
                    /> */}
                </Form>
            </div>
            <Button onClick={handleClick} disabled={isDisabled} type="primary" className={`${isDisabled ? 'bg-[#BDBDBD]' : ''} w-full h-10 sm:h-[65px] sm:text-xl text-base font-bold`}>
                {t('Deposit')}
            </Button>
            <Modal {...modalProps} centered footer={null} maskClosable={false} closeIcon={<AiFillCloseCircle color="#BDBDBD" size={30} />} confirmLoading={isLoading} width={330}>
                <div className="grid grid-cols-1 gap-x-6 px-3">
                    <div className="col-span-1 my-8">
                        <span className="text-center w-full block text-black font-bold text-base">{t('Scan QRcode to Finish Payment')}</span>
                        <div className="flex justify-between items-center my-2.5">
                            <span className="font-medium text-[#828282] text-xs">{t('Deposit Amount')}</span>
                            <span className="font-medium text-black text-xl">
                                <Amount amount={watchAmount} />
                            </span>
                        </div>
                        <div className="qrCodeWrap aspect-square max-w-[200px] m-auto">{qrcode ? <img className="w-full " src={qrcode} /> : <>Loading</>}</div>
                        <Button onClick={handleOpenUrl} className="w-full h-10 my-2 bg-[#5932EA] text-white rounded-2xl font-bold" type="primary" ghost>
                            {t('or Pay by URL')}
                        </Button>
                        <Button onClick={handleNotify} className="w-full h-10 border-2 border-[#9680EA] text-[#9680EA] rounded-2xl font-bold">
                            {t("Notify admin I've paid")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default index;
