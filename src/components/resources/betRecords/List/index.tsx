import { List } from '@refinedev/antd';
import BetRecordTable from '@/components/Admin/BetRecordTable';

const index = () => {
    return (
        <List canCreate={false}>
            <BetRecordTable user_id={1} />
        </List>
    );
};

export default index;
