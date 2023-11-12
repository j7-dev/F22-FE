import DetailedInformation from './DetailedInformation';
import { List } from '@refinedev/antd';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { t } = useTranslation();
    return (
        <List
            canCreate
            createButtonProps={{
                children: t('Create'),
            }}
        >
            <DetailedInformation />
        </List>
    );
};

export default index;
