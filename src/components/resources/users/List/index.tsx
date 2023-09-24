import DetailedInformation from './DetailedInformation';
import { List } from '@refinedev/antd';

const index = () => {
    return (
        <List canCreate>
            <DetailedInformation />
        </List>
    );
};

export default index;
