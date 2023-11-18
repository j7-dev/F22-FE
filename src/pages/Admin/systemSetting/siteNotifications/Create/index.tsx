import { Create } from '@/components/resources/cmsPosts';
import { useTranslation } from 'react-i18next';

const index = () => {
    const { t } = useTranslation();
    return <Create title={t('Create Site Notify')} />;
};

export default index;
