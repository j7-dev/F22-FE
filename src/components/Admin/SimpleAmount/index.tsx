import React from 'react';

const index: React.FC<{
    amount: number | null;
    className?: string;
}> = ({ amount: rawAmount, className = '' }) => {
    const amount = rawAmount || 0;
    return <span className={`whitespace-nowrap ${amount < 0 ? 'text-red-500 ' : ' '} ${className}`}>{Math.round(amount || 0).toLocaleString()}</span>;
};

export default index;
