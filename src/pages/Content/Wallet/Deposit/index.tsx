import React from 'react';
import {
    Form,
    // Alert,
    Modal,
    Button,
    Divider,
    notification,
    Popconfirm,
} from 'antd';
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

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { data: identity } = useGetIdentity<TMe>();
    const user_id = identity?.id;
    const CODEPAY_IDENTIFIER = `user_id:${user_id}`;

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
                show();

                const qrString = `codp:${CODEPAY_SIMPLE_ADDRESS_TO}?type=payment&identifier=userid${user_id}&amount=${watchAmount}`;
                generateQR(qrString);
            })
            .catch((errorInfo) => {
                console.log('errorInfo', errorInfo);
            });
    };

    const { default_currency, default_amount_type } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());

    const codePayUrl = `${CODEPAY_APP_URL}/payment?type=payment&simpleAddress=${CODEPAY_SIMPLE_ADDRESS_TO}&tag=smtbet7&identifier=${CODEPAY_IDENTIFIER}&amount=${watchAmount}`;
    //FIXME 這邊是不是要改成qrcode?
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

    const handleCancel = () => {
        close();
    };

    return (
        <div className="bg-white px-8 py-[42px] rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <span className="text-black font-bold text-2xl">{t('Deposit')}</span>
            <div className="min-h-[180px]">
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
                    <Button type="primary" className="w-full h-[65px] font-bold text-xl" onClick={handleClick}>
                        {t('Deposit')}
                    </Button>

                    <Modal
                        {...modalProps}
                        centered
                        title="Scan QR code to finish payment"
                        footer={
                            <div className="flex justify-between">
                                <Popconfirm title={t('')} description={t('Are you sure to leave without notification?')} onConfirm={handleCancel} okText="Yes" cancelText="No">
                                    <Button type="default">{t('Cancel')}</Button>
                                </Popconfirm>
                                <Button onClick={handleNotify} type="primary">
                                    {t("Notify admin I've paid")}
                                </Button>
                            </div>
                        }
                        maskClosable={false}
                        closeIcon={false}
                        confirmLoading={isLoading}
                        width={400}
                    >
                        <div className="grid grid-cols-1 gap-x-6">
                            <div className="col-span-1">
                                <table className="table table-vertical my-8 table-fixed">
                                    <tr>
                                        <th className="w-1/2">
                                            <span>{t('Deposit Amount')}</span>
                                        </th>
                                        <td className="w-1/2">
                                            <Amount amount={watchAmount} />
                                        </td>
                                    </tr>
                                </table>
                                {qrcode ? <img className="w-full" src={qrcode} /> : <>Loading</>}
                                <Divider plain>or</Divider>
                                <Button className="w-full mb-8" type="primary" ghost onClick={handleOpenUrl}>
                                    Pay by URL
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </Form>
            </div>
        </div>
    );
};

export default index;
