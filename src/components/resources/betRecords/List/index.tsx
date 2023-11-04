import UserBetRecordTable from '@/components/resources/betRecords/List/UserBetRecordTable';
import { Row, Col, Card } from 'antd';
import Filter from './Filter';

const index: React.FC<{ user_id?: string | number }> = ({ user_id }) => {
    return (
        <Row gutter={[16, 16]}>
            <Col lg={24} xs={24}>
                <Filter user_id={user_id} />
            </Col>
            <Col lg={24} xs={24}>
                <Card bordered={false}>
                    <UserBetRecordTable />
                </Card>
            </Col>
        </Row>
    );
};

export default index;
