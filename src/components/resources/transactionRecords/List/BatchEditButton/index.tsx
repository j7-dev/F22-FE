import { Button, Popconfirm, notification } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useUpdateMany, useGetIdentity } from '@refinedev/core';
import { selectedRecordsAtom } from '../atom';
import { useAtom } from 'jotai';
import { TMe } from '@/types';
import { RESOURCE } from '../../constants';
import { useTranslation } from 'react-i18next';

type TBatchEditButtonProps = {
    status: 'SUCCESS' | 'CANCEL';
    text: 'Approve' | 'Cancel';
    type: string;
    className?: string;
};

const index: React.FC<TBatchEditButtonProps> = ({ status, text, type, className }) => {
    const { t } = useTranslation();
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
                        description: `${t(text)} ${type} successfully`,
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
        <Popconfirm className={className} title={`${t(text)} ${type}`} description={`"Are you sure to ${text.toLowerCase()} these ${type.toLowerCase()} ?"`} onConfirm={handleUpdate} okText="Yes" cancelText="No" okButtonProps={{ loading: isLoading }}>
            <Button size="small" shape="round" type="primary" icon={text === 'Approve' ? <CheckOutlined /> : <CloseOutlined />} disabled={!selectedRecords.length} danger={text !== 'Approve'}>
                {t(text)} {t('Selected')} {selectedRecords.length ? `(${selectedRecords.length})` : null}
            </Button>
        </Popconfirm>
    );
};

export default index;
