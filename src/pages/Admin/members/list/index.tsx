import { Row, Col, Card, Form } from 'antd';
import Filter from './Filter';
import DetailedInformation from './DetailedInformation';
import CreateButton from './CreateButton';
import ModalForm from './ModalForm';
import { useAtomValue } from 'jotai';
import { modalPropsAtom } from './atom';

const index = () => {
    const [form] = Form.useForm();
    const modalProps = useAtomValue(modalPropsAtom);

    return (
        <>
            <Form form={form} layout="vertical">
                <div className="mb-4">
                    <CreateButton />
                </div>
                <Row gutter={[16, 16]}>
                    <Col lg={6} xs={24}>
                        <Card title="Filters">
                            <Filter />
                        </Card>
                    </Col>
                    <Col lg={18} xs={24}>
                        <Card title="Search Result">
                            <DetailedInformation />
                        </Card>
                    </Col>
                </Row>
                <ModalForm modalProps={modalProps} />
            </Form>
        </>
    );
};

export default index;
