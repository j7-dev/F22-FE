import { Row, Col, Card } from 'antd';
import { Show } from '@refinedev/antd';
import { useCan } from '@/hooks';
import { useShow } from '@refinedev/core';
import ObjectTable from '@/components/ObjectTable';

const index = () => {
    const { canDelete, canEdit } = useCan();
    const { queryResult } = useShow({
        meta: {
            populate: '*',
        },
    });

    console.log('⭐  index  dataBankAccounts', queryResult);

    return (
        <>
            <Show
                title="【afreece1988】Member Detail"
                resource="users"
                canDelete={canDelete}
                canEdit={canEdit}
                contentProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        padding: '24px 0px 24px 0px',
                    },
                }}
            >
                <Row gutter={[16, 16]} className="-ml-[24px] -mr-[24px]">
                    <Col lg={12} xs={24}>
                        <Card title="Info">
                            <ObjectTable />
                        </Card>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Card title="Search Result">
                            <hr className="my-8" />
                        </Card>
                    </Col>
                </Row>
            </Show>
        </>
    );
};

export default index;
