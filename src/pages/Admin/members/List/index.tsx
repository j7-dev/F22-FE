import { List } from '@/components/resources/users';

const index = () => {
    return <List roleType={['authenticated', 'agent']} />;
};

export default index;
