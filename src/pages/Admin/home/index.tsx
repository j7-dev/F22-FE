import ImportantInfo from './parts/ImportantInfo';
import RecentOperatingConditions from './parts/RecentOperatingConditions';
import { useVip } from '@/hooks';

const index = () => {
    const vip = useVip(1);
    console.log('⭐  vip:', vip);
    return (
        <>
            <RecentOperatingConditions />
            <ImportantInfo />
        </>
    );
};

export default index;
