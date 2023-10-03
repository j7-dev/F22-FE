import { Card } from 'antd';
import { Show } from '@refinedev/antd';
import { useCan } from '@/hooks';
import { useShow } from '@refinedev/core';
import ObjectTable from '@/components/general/ObjectTable';
import MoneyLog from '@/components/Admin/MoneyLog';
import LoginDetail from '@/components/Admin/LoginDetail';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useParams } from 'react-router-dom';

const index = () => {
    const { canDelete, canEdit } = useCan();
    const { queryResult } = useShow({
        meta: {
            populate: '*',
        },
    });
    const { id } = useParams<{ id: string }>();

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
                <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 1080: 2 }}>
                    <Masonry gutter="1.5rem">
                        <div>
                            <Card bordered={false} title="Info">
                                <ObjectTable />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="Money Log">
                                <MoneyLog user_id={id} />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="Login History">
                                <LoginDetail user_id={id} />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="Betting Records"></Card>
                        </div>
                    </Masonry>
                </ResponsiveMasonry>
            </Show>
        </>
    );
};

export default index;
