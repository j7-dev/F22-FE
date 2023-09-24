import { Button, Popconfirm, notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useUpdateMany, useGetIdentity } from '@refinedev/core';
import { selectedRecordsAtom } from '../atom';
import { useAtom } from 'jotai';
import { TUser } from '@/types';

const index = () => {
    const [selectedRecords, setSelectedRecords] = useAtom(selectedRecordsAtom);
    const { data: identity } = useGetIdentity<TUser>();
    const { mutate, isLoading } = useUpdateMany();
    const handleUpdate = () => {
        const ids = selectedRecords.map((record) => record.id);
        mutate(
            {
                resource: 'transaction-records',
                ids,
                values: {
                    status: 'SUCCESS',
                    updated_by_user_id: identity?.id,
                },
            },
            {
                onSuccess: () => {
                    notification.success({
                        key: 'approve-withdraw',
                        message: 'Success',
                        description: 'Approve withdraw successfully',
                    });
                    setSelectedRecords([]);
                },
            },
        );
    };

    return (
        <Popconfirm title="Approve withdraw" description="Are you sure to approve these withdraw ?" onConfirm={handleUpdate} okText="Yes" cancelText="No" okButtonProps={{ loading: isLoading }}>
            <Button type="primary" icon={<CheckOutlined />} disabled={!selectedRecords.length}>
                Approve Selected {selectedRecords.length ? `(${selectedRecords.length})` : null}
            </Button>
        </Popconfirm>
    );
};

export default index;
