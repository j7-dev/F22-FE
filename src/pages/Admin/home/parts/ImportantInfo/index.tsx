import { Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import Table from './Table';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const index = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Title level={5}>
                <InfoCircleFilled className="mr-2" />
                {t('Important info')}
            </Title>
            <Table />
        </div>
    );
};

export default index;
