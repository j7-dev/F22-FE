import { List } from '@refinedev/antd';
import BetRecordTable from '@/components/Admin/BetRecordTable';
import { Card, Col, Row, Form } from 'antd';
import Filter from './Filter';
import FilterTags from '@/components/Admin/FilterTags';
import { enabledAtom } from './atom';
import { useAtom } from 'jotai';

const index = () => {
    const [form] = Form.useForm();

    const filterTagsKey = JSON.stringify(form?.getFieldsValue());

    const [enabled, setEnabled] = useAtom(enabledAtom);

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

                            <BetRecordTable enabled={enabled} setEnabled={setEnabled} />
                        </Card>
                    </Col>
                </Row>
            </Form>
        </List>
    );
};

export default index;
