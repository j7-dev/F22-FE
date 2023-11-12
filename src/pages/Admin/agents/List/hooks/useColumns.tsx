import { DataType } from '../types';
import { BooleanIndicator, DateTime } from '@/components/PureComponents';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import ReferralLink from '@/components/general/ReferralLink';
import RowActionButton from '../RowActionButton';

const useColumns = () => {
    const { t } = useTranslation();

    const columns: ColumnsType<DataType> = [
        {
            title: t('#'),
            dataIndex: 'id',
            key: 'id',
        },

        {
            title: t('Account'),
            dataIndex: 'username',
            key: 'Account',
        },
        {
            title: t('Commission Rate'),
            dataIndex: 'commission_rate',
            key: 'commission_rate',
            render: (commission_rate: number) => `${commission_rate || 0}%`,
        },
        {
            key: 'referralLink',
            title: t('Referral Link'),
            dataIndex: 'username',
            render: (username: string) => <ReferralLink uuid={username} />,
        },
        {
            title: t('Created At'),
            dataIndex: 'createdAt',
            key: 'status',
            render: (v: string) => <DateTime value={v} />,
        },
        {
            title: t('Last Login At'),
            dataIndex: 'lastLoginAt',
            key: 'lastLoginAt',
            render: (v: string) => <DateTime value={v} />,
        },
        {
            title: t('status'),
            dataIndex: 'confirmed',
            key: 'status',
            align: 'center',
            render: (confirmed: boolean) => (
                <BooleanIndicator
                    enabled={confirmed}
                    tooltipProps={{
                        title: confirmed ? 'Confirmed' : 'Not Confirmed',
                        enabled: true,
                    }}
                />
            ),
        },
        {
            title: t(''),
            fixed: 'right',
            dataIndex: 'id',
            key: 'action',
            render: (id: number) => <RowActionButton id={id} />,
        },
    ];

    return columns;
};

export default useColumns;
