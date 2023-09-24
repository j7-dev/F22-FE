import DetailedInformation from './DetailedInformation';
import { List } from '@refinedev/antd';
import { TRoleType } from '@/types';

const index: React.FC<{
    roleType?: TRoleType | TRoleType[];
}> = ({ roleType = 'authenticated' }) => {
    return (
        <List canCreate>
            <DetailedInformation roleType={roleType} />
        </List>
    );
};

export default index;
