import { Edit } from '@/components/resources/cmsPosts';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { t } = useTranslation();
    return <Edit title={t('Edit Site Notify')} />;
};

export default index;
