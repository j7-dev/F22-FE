import LineChart from './LineChart';
import useDashboard from '../hooks/useDashboard';
import { TLineData } from '../types';

const index = () => {
    const { data, isLoading } = useDashboard();
    const dpWd = (data?.data?.data?.dpWd || []) as TLineData[];
    const validBetData = (data?.data?.data?.validBet || []) as TLineData[];
    const numberOfRegistrants = (data?.data?.data?.numberOfRegistrants || []) as TLineData[];
    const onlineMembersData = (data?.data?.data?.onlineMembers || []) as TLineData[];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 py-8">
                <LineChart data={dpWd} title="DP-WD" titleColor="#108ee9" yAxis="Amount" isLoading={isLoading} />

                <LineChart data={validBetData} title="Valid Bet" titleColor="#f50" yAxis="Transaction Amount" isLoading={isLoading} />

                <LineChart data={numberOfRegistrants} title="Number of Registrants" titleColor="#d46b08" yAxis="members" isLoading={isLoading} />

                <LineChart data={onlineMembersData} title="Online Members" titleColor="#389e0d" yAxis="Member count" isLoading={isLoading} />
            </div>
        </>
    );
};

export default index;
