import { List } from '@refinedev/antd';
import BetRecordTable from '@/components/Admin/BetRecordTable';
import { Card, Col, Row, Form } from 'antd';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';

const index = () => {
    const [form] = Form.useForm();

    const filterTagsKey = JSON.stringify(form?.getFieldsValue());

    // TODO ATOM
    const user_id = Form.useWatch(['user'], form);

    return (
        <List canCreate={false}>
            <Form form={form} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col lg={24} xs={24}>
                        <Filter />
                    </Col>
                    <Col lg={24} xs={24}>
                        <Card bordered={false}>
                            <div className="mb-4">
                                <FilterTags key={filterTagsKey} form={form} />
                            </div>

                            <BetRecordTable user_id={user_id} />
                        </Card>
                    </Col>
                </Row>
            </Form>
        </List>
    );
};

export default index;
