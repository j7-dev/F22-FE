import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useDashboard from '../hooks/useDashboard';
import { TLineData, DataType } from '../types';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useDashboard();
    const dpWdData = (data?.data?.data?.dpWd || []) as TLineData[];
    const numberOfRegistrantsData = (data?.data?.data?.numberOfRegistrants || []) as TLineData[];
    const onlineMembersData = (data?.data?.data?.onlineMembers || []) as TLineData[];
    const totalDeposit = (data?.data?.data?.totalDeposit || []) as TLineData[];
    const validBetData = (data?.data?.data?.validBet || []) as TLineData[];

    const tableData: DataType[] = dpWdData.map((item, i) => ({
        date: item.date,
        dpWd: (item?.value || 0).toLocaleString(),
        numberOfRegistrants: (numberOfRegistrantsData?.[i]?.value || 0).toLocaleString(),
        onlineMembers: (onlineMembersData?.[i]?.value || 0).toLocaleString(),
        totalDeposit: (totalDeposit?.[i]?.value || 0).toLocaleString(),
        validBet: (validBetData?.[i]?.value || 0).toLocaleString(),
    }));

    const columns: ColumnsType<DataType> = [
        {
            title: t('Date'),
            dataIndex: 'date',
        },
        {
            title: t('DP-WD'),
            dataIndex: 'dpWd',
        },
        {
            title: t('Number Of Registrants'),
            dataIndex: 'numberOfRegistrants',
        },
        {
            title: t('Valid Bet'),
            dataIndex: 'validBet',
        },
        {
            title: t('Online Members'),
            dataIndex: 'onlineMembers',
        },
        {
            title: t('Total Deposit'),
            dataIndex: 'totalDeposit',
        },
    ];

    // 只會顯示最近7天  不含今天
    return (
        <>
            <Table loading={isLoading} rowKey="date" columns={columns} dataSource={tableData} pagination={false} />
        </>
    );
};

export default index;
