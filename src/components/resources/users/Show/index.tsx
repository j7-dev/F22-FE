import { Card } from 'antd';
import { Show } from '@refinedev/antd';
import { useCan } from '@/hooks';
import { useShow } from '@refinedev/core';
import ObjectTable from '@/components/general/ObjectTable';
import MoneyLog from '@/components/Admin/MoneyLog';
import LoginDetail from '@/components/Admin/LoginDetail';
import BetRecordTable from '@/components/Admin/BetRecordTable';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useParams } from 'react-router-dom';
import { TUser } from '@/types';
import { infoColumns } from './infoColumns';

const index = () => {
    const { canDelete, canEdit } = useCan();
    const { id } = useParams<{ id: string }>();
    const { queryResult } = useShow({
        resource: 'users',
        id,
        meta: {
            // populate: '*',
        },
    });
    const { data, isLoading } = queryResult;

    const theUser = (data?.data || {}) as TUser;

    return (
        <>
            <Show
                isLoading={isLoading}
                title={`【${theUser?.display_name}】Member Detail`}
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
                                <ObjectTable record={theUser} columns={infoColumns} />
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
                            <Card bordered={false} title="Betting Records">
                                <BetRecordTable user_id={id} />
                            </Card>
                        </div>
                        <div>
                            <Card bordered={false} title="User Notes"></Card>
                        </div>
                    </Masonry>
                </ResponsiveMasonry>
            </Show>
        </>
    );
};

export default index;
