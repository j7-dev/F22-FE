import { Tag } from 'antd';
import { statusColorEnum } from '@/utils';
import { useTranslation } from 'react-i18next';

export const useGetStatusTag = () => {
    const { t } = useTranslation();
    const getStatusTag = (status: string) => {
        return <Tag color={statusColorEnum?.[status] || 'default'}>{t(status)}</Tag>;
    };

    return { getStatusTag };
};
