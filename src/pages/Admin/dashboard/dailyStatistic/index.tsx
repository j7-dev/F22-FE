import { Row, Col, Card } from 'antd';
import Filter from './Filter';
import DetailedInformation from './DetailedInformation';

const index = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    <Card bordered={false}>
                        <Filter />
                    </Card>
                </Col>
                <Col lg={24} xs={24}>
                    <Card bordered={false}>
                        <DetailedInformation />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default index;
