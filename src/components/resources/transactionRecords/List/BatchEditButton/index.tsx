import { Button, Popconfirm, notification } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useUpdateMany, useGetIdentity } from '@refinedev/core';
import { selectedRecordsAtom } from '../atom';
import { useAtom } from 'jotai';
import { TMe } from '@/types';
import { RESOURCE } from '../../constants';

/**
 * BUG 同時變更多筆資料會產生死鎖
 * Insert ignore into transaction_records_updated_by_user_id_links (`transaction_record_id`, `user_id`) values (116, 26) - ER_LOCK_DEADLOCK: Deadlock found when trying to get lock; try restarting transaction
 */

type TBatchEditButtonProps = {
    status: 'SUCCESS' | 'CANCEL';
    text: 'Approve' | 'Cancel';
    type: string;
    className?: string;
};

const index: React.FC<TBatchEditButtonProps> = ({ status, text, type, className }) => {
    const [selectedRecords, setSelectedRecords] = useAtom(selectedRecordsAtom);
    const { data: identity } = useGetIdentity<TMe>();
    const { mutate, isLoading } = useUpdateMany();
    const handleUpdate = () => {
        const ids = selectedRecords.map((record) => record.id);
        mutate(
            {
                resource: RESOURCE,
                ids,
                values: {
                    status,
                    updated_by_user_id: identity?.id,
                },
            },
            {
                onSuccess: () => {
                    notification.success({
                        key: `${text}-${type}`,
                        message: 'Success',
                        description: `${text} ${type} successfully`,
                    });
                    setSelectedRecords([]);
                },
                onError: (error) => {
                    console.log('⭐  error:', error);
                },
            },
        );
    };

    return (
        <Popconfirm className={className} title={`${text} ${type}`} description={`"Are you sure to ${text.toLowerCase()} these ${type.toLowerCase()} ?"`} onConfirm={handleUpdate} okText="Yes" cancelText="No" okButtonProps={{ loading: isLoading }}>
            <Button size="small" shape="round" type="primary" icon={text === 'Approve' ? <CheckOutlined /> : <CloseOutlined />} disabled={!selectedRecords.length} danger={text !== 'Approve'}>
                {text} Selected {selectedRecords.length ? `(${selectedRecords.length})` : null}
            </Button>
        </Popconfirm>
    );
};

export default index;
