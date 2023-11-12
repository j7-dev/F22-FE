import { Typography } from 'antd';

const { Paragraph } = Typography;
const SITE_URL = 'https://smtbet7.com';

const index: React.FC<{ uuid: string }> = ({ uuid }) => {
    return <Paragraph className="m-0" copyable>{`${SITE_URL}?ref=${uuid}`}</Paragraph>;
};

export default index;
