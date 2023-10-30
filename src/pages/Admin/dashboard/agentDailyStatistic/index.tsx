import { Row, Col, Card } from 'antd';
import Filter from './Filter';
import DetailedInformation from './DetailedInformation';
import { searchPropsAtom } from './atom';
import AgentList from '@/components/form/AgentList';

const index = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    <Card bordered={false}>
                        <Filter />
                    </Card>
                </Col>
                <Col lg={4} xs={4}>
                    <Card bordered={false}>
                        <AgentList atom={searchPropsAtom} />
                    </Card>
                </Col>
                <Col lg={20} xs={20}>
                    <Card bordered={false}>
                        <DetailedInformation />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default index;
