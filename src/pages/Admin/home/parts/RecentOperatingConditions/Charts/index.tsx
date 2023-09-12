import React from 'react';
import LineChart from './LineChart';
import { winLossData, validBetData, bettingAmountData, onlineMembersData } from '../atom';
import { FakeAlert } from '@/components/PureComponents';

const index = () => {
    return (
        <>
            <FakeAlert />
            <div className="grid grid-cols-2 gap-x-16 gap-y-32 py-8">
                <div className="h-[200px]">
                    <LineChart data={winLossData} title="Win / Loss" titleColor="#108ee9" yAxis="Transaction Amount" />
                </div>
                <div className="h-[200px]">
                    <LineChart data={validBetData} title="Valid Bet" titleColor="#f50" yAxis="Transaction Amount" />
                </div>
                <div className="h-[200px]">
                    <LineChart data={bettingAmountData} title="Betting Amount" titleColor="#d46b08" yAxis="Ticket" />
                </div>
                <div className="h-[200px]">
                    <LineChart data={onlineMembersData} title="Online Members" titleColor="#389e0d" yAxis="Member count" />
                </div>
            </div>
        </>
    );
};

export default index;
