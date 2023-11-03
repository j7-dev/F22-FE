import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { useGetIdentity, useApiUrl, useCustomMutation } from '@refinedev/core';
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
import DepositMethod from './DepositMethod';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const { data: identity } = useGetIdentity<TMe>();
    const user_id = identity?.id;
    const CODEPAY_IDENTIFIER = `userId${user_id}`;
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

    const { mutate: doDeposit, isLoading } = useCustomMutation();
    const apiUrl = useApiUrl();
    const handleClick = () => {
        form.validateFields()
            .then(() => {
                //電腦版顯示Modal，手機版直接開啟網址
                if (showPc) {
                    show();

                    const qrString = `codp:${CODEPAY_SIMPLE_ADDRESS_TO}?type=payment&identifier=userid${user_id}&amount=${watchAmount}`;
                    generateQR(qrString);
                } else {
                    //在手機版如果是transfer，顯示Modal
                    if (form.getFieldsValue(['depositMethod']).depositMethod === 'TRANSFER') {
                        show();
                    } else {
                        //在手機版如果是codePay，直接開啟網址
                        handleOpenUrl();
                    }
                }
                //當按下Deposit按鈕直接送出表單
                const values = form.getFieldsValue();
                doDeposit({
                    url: `${apiUrl}/wallet-api/cash/deposit`,
                    method: 'post',
                    values: {
                        ...values,
                        user_id,
                        currency: default_currency,
                        amount_type: default_amount_type,
                        deposit_bonus: values?.chosen_bonus,
                    },
                });
            })
            .catch((errorInfo) => {
                console.log('errorInfo', errorInfo);
            });
    };

    const { default_currency, default_amount_type } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());

    const codePayUrl = `${CODEPAY_APP_URL}/payment?type=payment&simpleAddress=${CODEPAY_SIMPLE_ADDRESS_TO}&identifier=${CODEPAY_IDENTIFIER}&amount=${watchAmount}`;
    const handleOpenUrl = () => {
        window.open(codePayUrl, '_blank');
    };

    //監聽Form的值，都填寫完畢後，使Button可以點擊
    const values = Form.useWatch([], form);
    // console.log('🚀 ~ values:', values);
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
                            label: <span className="mt-1 text-sm text-[#828282] font-medium">{t('Amount to deposit')}</span>,
                            name: ['amount'],
                            rules: [
                                {
                                    type: 'number',
                                    min: 1,
                                    message: t('Please input amount greater than 0 !'),
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
                    <DepositMethod />
                </Form>
            </div>
            <div className="grid grid-cols-2 sm:gap-4 gap-2">
                <Button onClick={handleClick} disabled={isDisabled} type="primary" className={`${isDisabled ? 'bg-[#BDBDBD]' : ''} col-span-2 w-full h-10 sm:h-[65px] sm:text-xl text-base font-bold`}>
                    {t('Deposit')}
                </Button>
            </div>
            <Modal {...modalProps} centered footer={null} maskClosable={false} closeIcon={<AiFillCloseCircle color="#BDBDBD" size={30} />} confirmLoading={isLoading} width={330}>
                <div className="grid grid-cols-1 gap-x-6 px-3">
                    <div className="col-span-1 my-8">
                        {
                            //顯示QRCode或匯款帳號
                            values?.depositMethod === 'codePay' ? (
                                <>
                                    <span className="text-center w-full block text-black font-bold text-base">{t('Scan QRcode to Finish Payment')}</span>
                                    <div className="flex justify-between items-center my-2.5">
                                        <span className="font-medium text-[#828282] text-xs">{t('Deposit Amount')}</span>
                                        <span className="font-medium text-black text-xl">
                                            <Amount amount={watchAmount} />
                                        </span>
                                    </div>
                                    <div className="qrCodeWrap aspect-square max-w-[200px] m-auto">{qrcode ? <img className="w-full " src={qrcode} /> : <>Loading</>}</div>
                                    <span className="block font-medium text-[#828282] text-xs text-center">{t('Please be inform that it might take a moment to process')}</span>
                                </>
                            ) : (
                                <>
                                    <span className="block font-bold text-black text-base text-center  ">{t('계좌입금신청')}</span>
                                    <div className="flex flex-col gap-2 my-2.5">
                                        <span className="block font-medium text-[#828282] text-xs text-center">{t('* 입금하실 은행정보는 쪽지로 발송됩니다')}</span>
                                        <span className="block font-medium text-[#9680EA] text-xl text-center whitespace-nowrap">{t('* 본인 외 계좌만 입금처리 됩니다')}</span>
                                        <span className="block font-medium text-[#9680EA] text-xs text-center">{t('* 금융사기 보이스피싱 통협 절대 타협 없음')}</span>
                                    </div>
                                </>
                            )
                        }
                        {/* <Button onClick={handleOpenUrl} className="w-full h-10 my-2 bg-[#5932EA] text-white rounded-2xl font-bold" type="primary" ghost>
                            {t('or Pay by URL')}
                        </Button> */}
                        <Button onClick={close} className="w-full h-10 my-2 bg-[#5932EA] text-white rounded-2xl font-bold">
                            {t('I’ve paid')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default index;
