import ImportantInfo from './parts/ImportantInfo';
import RecentOperatingConditions from './parts/RecentOperatingConditions';
import { TMe } from '@/types';
import { useGetIdentity } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const index = () => {
    const { data: identity } = useGetIdentity<TMe>();
    const navigate = useNavigate();
    const role = identity?.role?.type || '';
    useEffect(() => {
        if (role === 'agent') {
            navigate('/refine/dashboard/daily-statistic');
        }
    }, [role]);

    if (role === 'admin') {
        return (
            <>
                <RecentOperatingConditions />
                <ImportantInfo />
            </>
        );
    }
    return <></>;
};

export default index;
