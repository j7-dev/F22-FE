import dayjs from 'dayjs';
import { DataType } from './Table/types';

export const winLossData = new Array(7).fill(0).map((_, i) => {
    return {
        date: dayjs().subtract(7, 'day').add(i, 'day').format('YYYY/MM/DD (dd)'),
        value: Math.floor(Math.random() * 100000),
    };
});

export const validBetData = new Array(7).fill(0).map((_, i) => {
    return {
        date: dayjs().subtract(7, 'day').add(i, 'day').format('YYYY/MM/DD (dd)'),
        value: Math.floor(Math.random() * 100000),
    };
});

export const bettingAmountData = new Array(7).fill(0).map((_, i) => {
    return {
        date: dayjs().subtract(7, 'day').add(i, 'day').format('YYYY/MM/DD (dd)'),
        value: Math.floor(Math.random() * 100000),
    };
});

export const onlineMembersData = new Array(7).fill(0).map((_, i) => {
    return {
        date: dayjs().subtract(7, 'day').add(i, 'day').format('YYYY/MM/DD (dd)'),
        value: Math.floor(Math.random() * 100000),
    };
});

export const tableData: DataType[] = winLossData.map((item, i) => ({
    date: item.date,
    onlineMembers: onlineMembersData[i].value.toLocaleString(),
    bettingAmount: bettingAmountData[i].value.toLocaleString(),
    validBet: validBetData[i].value.toLocaleString(),
    winLoss: item.value.toLocaleString(),
    totalDeposit: Math.floor(Math.random() * 100000).toLocaleString(),
}));
