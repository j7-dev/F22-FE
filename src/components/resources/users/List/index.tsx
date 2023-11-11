import DetailedInformation from './DetailedInformation';
import { List } from '@refinedev/antd';
import { TRoleType } from '@/types';
import { useTranslation } from 'react-i18next';

const index: React.FC<{
    roleType?: TRoleType | TRoleType[];
}> = ({ roleType = 'authenticated' }) => {
    const { t } = useTranslation();
    return (
        <List
            canCreate
            createButtonProps={{
                children: t('Create'),
            }}
        >
            <DetailedInformation roleType={roleType} />
        </List>
    );
};

export default index;
