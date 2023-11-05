import React, { useEffect, useState } from 'react';
import { useGetIdentity, useApiUrl, useCustomMutation } from '@refinedev/core';
import { useModal } from '@refinedev/antd';
import { Form, Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import QRCode from 'qrcode';
import getSymbolFromCurrency from 'currency-symbol-map';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { TMe } from '@/types';
import { CODEPAY_APP_URL, CODEPAY_SIMPLE_ADDRESS_TO } from '@/utils';
import { useGetTransactionRecords } from '@/hooks/useGetTransactionRecords';
import { useGetSiteSetting } from '@/hooks';
import { useShowPc } from '@/hooks/useShowPc';
import Amount from '@/components/Admin/Amount';
import BonusDetails from './BonusDetails';
import DepositMethod from './DepositMethod';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { AiFillCloseCircle } from 'react-icons/ai';

const index: React.FC = () => {
    const { t } = useTranslation();
    const setActiveMenu = useSetAtom(activeMenuAtom);
    const [form] = Form.useForm();
    const showPc = useShowPc();
    const { modalProps, show, close } = useModal();
    const [isDisabled, setIsDisabled] = useState(true); //按鈕點擊狀態
    //取得預設幣別
    const { default_currency, default_amount_type } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());
    //取得identity
    const { data: identity } = useGetIdentity<TMe>();
    const user_id = identity?.id;
    //取得上一筆交易紀錄狀態
    const { tableProps } = useGetTransactionRecords({ type: ['DEPOSIT'], userID: user_id, pageSize: 1 });
    const lastTransaction = tableProps?.dataSource?.[0]?.status;
    const CODEPAY_IDENTIFIER = `userId${user_id}`;
    //監聽Form的值
    const values = Form.useWatch([], form);
    const watchAmount = values?.amount;
    //QRCode
    const [qrcode, setQrcode] = React.useState('');
    const generateQR = async (text: string) => {
        try {
            const url = await QRCode.toDataURL(text);
            setQrcode(url);
        } catch (err) {
            console.error(err);
        }
    };
    //送出表單
    const { mutate: doDeposit, isLoading } = useCustomMutation();
    const apiUrl = useApiUrl();
    const handleClick = () => {
        form.validateFields()
            .then(() => {
                //當按下Deposit按鈕前先驗證上筆存款狀態
                //如果上筆存款狀態為PENDING則跳出彈窗提示
                if (lastTransaction === 'PENDING') {
                    Modal.info({
                        centered: true,
                        title: t('주의'),
                        content: (
                            <div>
                                <p>{t('현재 대기중인 입금건이 있습니다')}</p>
                                <p>{t('입금완료후 신청바랍니다')}</p>
                            </div>
                        ),
                        okText: t('OK'),
                        onOk: () => {
                            close();
                        },
                    });
                    return;
                } else {
                    //否則執行送出表單
                    //判斷付款方式是否為TRANSFER
                    const isTransfer = values.depositMethod === 'TRANSFER';
                    //如果是TRANSFER，不論裝置都顯示Modal
                    //如果是CODEPAY，判斷裝置顯示Modal或開啟網址
                    if (isTransfer) {
                        show();
                    } else {
                        if (showPc) {
                            show();
                            const qrString = `codp:${CODEPAY_SIMPLE_ADDRESS_TO}?type=payment&identifier=userid${user_id}&amount=${watchAmount}`;
                            generateQR(qrString);
                        } else {
                            const codePayUrl = `${CODEPAY_APP_URL}/payment?type=payment&simpleAddress=${CODEPAY_SIMPLE_ADDRESS_TO}&identifier=${CODEPAY_IDENTIFIER}&amount=${watchAmount}`;
                            window.open(codePayUrl, '_blank');
                        }
                    }
                    doDeposit({
                        url: `${apiUrl}/wallet-api/cash/deposit`,
                        method: 'post',
                        values: {
                            ...values,
                            user_id,
                            currency: default_currency,
                            amount_type: default_amount_type,
                            deposit_bonus: values?.chosen_bonus,
                            method: values?.depositMethod,
                        },
                    });
                }
            })
            .catch((errorInfo) => {
                console.log('errorInfo', errorInfo);
            });
    };
    //驗證表單值都填寫完畢後，才使Button可以點擊
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
            <Modal {...modalProps} centered footer={null} maskClosable={false} closeIcon={<AiFillCloseCircle color="#BDBDBD" size={30} />} confirmLoading={isLoading} width={500}>
                <div className="grid grid-cols-1 gap-x-6 px-3">
                    <div className="col-span-1 my-8">
                        {
                            //顯示QRCode或匯款帳號
                            values?.depositMethod === 'CODEPAY' ? (
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
                                        <span className="block font-medium text-[#828282] text-center">{t('입금하실 계좌는 라이브챗으로 문의바랍니다')}</span>
                                        <span className="block font-medium text-[#9680EA] text-xl text-center whitespace-nowrap">{t('본인 외 계좌만 입금처리 됩니다')}</span>
                                        <span className="block font-medium text-[#9680EA] text-center">{t('금융사기 보이스피싱 통협 절대 타협 없음')}</span>
                                    </div>
                                </>
                            )
                        }
                        {/* <Button onClick={handleOpenUrl} className="w-full h-10 my-2 bg-[#5932EA] text-white rounded-2xl font-bold" type="primary" ghost>
                            {t('or Pay by URL')}
                        </Button> */}
                        <Button
                            onClick={() => {
                                setActiveMenu('myPage');
                            }}
                            className="w-full h-10 my-2 bg-[#5932EA] text-white rounded-2xl font-bold"
                        >
                            {t('I’ve paid')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default index;
