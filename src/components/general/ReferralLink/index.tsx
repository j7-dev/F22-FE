import { Typography } from 'antd';
import { API_URL as SITE_URL } from '@/utils';

const { Paragraph } = Typography;

const index: React.FC<{ uuid: string }> = ({ uuid }) => {
    return <Paragraph className="m-0" copyable>{`${SITE_URL}?ref=${uuid}`}</Paragraph>;
};

export default index;
