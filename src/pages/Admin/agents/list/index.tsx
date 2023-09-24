import { List } from '@/components/resources/users';
import { TRoleType } from '@/types';

const index = () => {
    const roleType: TRoleType[] = ['agent', 'top_agent'];
    return <List roleType={roleType} />;
};

export default index;
