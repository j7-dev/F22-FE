import { Table, TableProps } from 'antd';
import { useTable } from '@refinedev/antd';
import { TLoginDetail } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import UserAgent from './UserAgent';
import { DateTime } from '@/components/PureComponents';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    user_id: string | number | undefined;
}> = ({ user_id }) => {
    const { t } = useTranslation();
    if (!user_id) return <p>can't get user_id</p>;

    const columns: ColumnsType<TLoginDetail> = [
        {
            title: t('Login Time'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => <DateTime value={createdAt} />,
        },
        {
            title: t('ip'),
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: t('Login URL'),
            dataIndex: 'login_url',
            key: 'login_url',
        },
        {
            title: t('User Agent'),
            dataIndex: 'user_agent',
            key: 'user_agent',
            render: (user_agent) => <UserAgent user_agent={user_agent} />,
        },
    ];

    const { tableProps } = useTable<TLoginDetail>({
        resource: 'login-details',
        filters: {
            permanent: [
                {
                    field: 'user.id',
                    operator: 'eq',
                    value: user_id,
                },
            ],
        },
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
    });

    const formattedTableProps = {
        ...tableProps,
        columns,
        rowKey: 'id',
    } as TableProps<TLoginDetail>;

    return <Table {...formattedTableProps} />;
};

export default index;
