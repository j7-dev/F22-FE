import { Row, Col, Card } from 'antd';
import Filter from './Filter';
import DetailedInformation from './DetailedInformation';

const index = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col lg={6} xs={24}>
                    <Card title="Filters">
                        <Filter />
                    </Card>
                </Col>
                <Col lg={18} xs={24}>
                    <Card bordered={false} title="Search Result">
                        <DetailedInformation />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default index;
