import { Tooltip } from 'antd';
import { TUSER_STATUSES } from '@/types';
import { useTranslation } from 'react-i18next';

const getBgColor = (user_status: TUSER_STATUSES) => {
    switch (user_status) {
        case 'UNCONFIRMED':
            return 'bg-red-500';
        case 'ACTIVE':
            return 'bg-teal-500';
        case 'INACTIVE':
            return 'bg-orange-500';
        case 'OUT':
            return 'bg-gray-500';
        default:
            return 'bg-gray-500';
    }
};

const index = ({ user_status }: { user_status: TUSER_STATUSES }) => {
    const { t } = useTranslation();
    const bgColor = getBgColor(user_status);

    return (
        <Tooltip title={t(user_status)}>
            <div className={`w-3 h-3 rounded-full inline-block ${bgColor} `} />
        </Tooltip>
    );
};

export default index;
