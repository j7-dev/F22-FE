import LineChart from './LineChart';
import useDashboard from '../hooks/useDashboard';
import { TLineData } from '../types';

const index = () => {
    const { data, isLoading } = useDashboard();
    const winLossData = (data?.data?.data?.winLossRatio || []) as TLineData[];
    const validBetData = (data?.data?.data?.validBet || []) as TLineData[];
    const bettingAmountData = (data?.data?.data?.bettingAmount || []) as TLineData[];
    const onlineMembersData = (data?.data?.data?.onlineMembers || []) as TLineData[];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 py-8">
                <LineChart data={winLossData} title="Win / Loss" titleColor="#108ee9" yAxis="Transaction Amount" isLoading={isLoading} />

                <LineChart data={validBetData} title="Valid Bet" titleColor="#f50" yAxis="Transaction Amount" isLoading={isLoading} />

                <LineChart data={bettingAmountData} title="Betting Amount" titleColor="#d46b08" yAxis="Ticket" isLoading={isLoading} />

                <LineChart data={onlineMembersData} title="Online Members" titleColor="#389e0d" yAxis="Member count" isLoading={isLoading} />
            </div>
        </>
    );
};

export default index;
