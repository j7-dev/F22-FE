import DetailedInformation from './DetailedInformation';
import { List } from '@refinedev/antd';
import { useTranslation } from 'react-i18next';
import { useGetUserRoleType } from '@/hooks';

const index = () => {
    const { t } = useTranslation();
    const roleType = useGetUserRoleType();

    return (
        <List
            title={t('All Members')}
            canCreate={roleType === 'admin'}
            createButtonProps={{
                children: t('Create'),
            }}
        >
            <DetailedInformation />
        </List>
    );
};

export default index;
