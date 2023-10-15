import React from 'react';
import { Form, Input, notification, Alert, Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import QuickAmountInput from '@/components/form/QuickAmountInput';
import { LockOutlined } from '@ant-design/icons';
import { useGetIdentity, useCustomMutation, useApiUrl } from '@refinedev/core';
import { TMe } from '@/types';
import { useModal } from '@refinedev/antd';
import { CODEPAY_APP_URL, CODEPAY_SIMPLE_ADDRESS_TO } from '@/utils';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';

const CODEPAY_IDENTIFIER = 'smtbet7deposittest';

const index: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { data: identity } = useGetIdentity<TMe>();
    const userId = identity?.id;
    const { mutate: deposit, isLoading } = useCustomMutation();
    const apiUrl = useApiUrl();
    const { modalProps, show, close } = useModal();
    const watchSimpleAddressFrom = Form.useWatch(['simpleAddressFrom'], form);
    const watchAmount = Form.useWatch(['amount'], form);

    const handleClick = () => {
        form.validateFields()
            .then(() => {
                show();
            })
            .catch((errorInfo) => {
                console.log('errorInfo', errorInfo);
            });
    };

    const handleDeposit = () => {
        const values = form.getFieldsValue();
        deposit(
            {
                url: `${apiUrl}/codepay/deposit`,
                method: 'post',
                values: { ...values, user_id: userId },
            },
            {
                onSuccess: () => {
                    // TODO const txnId = data?.data?.data?.id;
                    notification.success({
                        key: 'deposit',
                        message: `Deposit $${values.amount} Success `,
                        duration: null,
                    });
                    close();
                },
            },
        );
    };
    const { default_currency } = useGetSiteSetting();
    const symbol = getSymbolFromCurrency(default_currency.toUpperCase());

    const codePayUrl = `${CODEPAY_APP_URL}/payment?type=payment&simpeAddress=${CODEPAY_SIMPLE_ADDRESS_TO}&tag=smtbet7&identifier=${CODEPAY_IDENTIFIER}&amount=${watchAmount}`;

    return (
        <div className="px-8 py-[42px] rounded-2xl sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
            <span className="text-black font-bold text-2xl">{t('Deposit')}</span>
            <div className="min-h-[180px]">
                <Form form={form} initialValues={{ amount: '0' }} layout="vertical">
                    <QuickAmountInput
                        formItemProps={{
                            label: t('Amount to transfer'),
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

                    <div className="mt-8">
                        <Form.Item
                            name={['simpleAddressFrom']}
                            label={t('Your CodePay Simple Address')}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your simple address!',
                                },
                            ]}
                        >
                            <Input prefix="¥" style={{ textAlign: 'right' }} />
                        </Form.Item>

                        <Form.Item
                            name={['sendPassword']}
                            label={t('Your CodePay Send Password')}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} style={{ textAlign: 'right' }} />
                        </Form.Item>
                        <Form.Item name={['currency']} hidden initialValue="KRW">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user_id']} hidden>
                            <Input />
                        </Form.Item>
                    </div>

                    <Alert
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
                        type="info"
                        showIcon
                    />
                    <Button type="primary" loading={isLoading} className="mt-5 w-full font-bold" onClick={handleClick}>
                        {t('Deposit')}
                    </Button>
                    <a href={codePayUrl} target="_blank">
                        <Button type="primary" className="mt-5 w-full font-bold">
                            {t('Deposit')}
                        </Button>
                    </a>

                    <Modal {...modalProps} centered title="Confirm Deposit" okText={t('confirm')} onOk={handleDeposit} confirmLoading={isLoading}>
                        <table className="table table-vertical my-8">
                            <tr>
                                <th>
                                    <span>{t('Your CodePay Simple Address')}</span>
                                </th>
                                <td>{watchSimpleAddressFrom}</td>
                            </tr>
                            <tr>
                                <th>
                                    <span>{t('Deposit Amount')}</span>
                                </th>
                                <td>{watchAmount}</td>
                            </tr>
                        </table>
                    </Modal>
                </Form>
            </div>
        </div>
    );
};

export default index;
