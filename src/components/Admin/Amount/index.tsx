import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGetSiteSetting } from '@/hooks';

const index: React.FC<{
    amount: number | null;
    currency?: string | null;
    symbol?: boolean;
    className?: string;
}> = ({ amount: rawAmount, currency: rawCurrency, symbol = true, className = '' }) => {
    const { default_currency } = useGetSiteSetting();
    const amount = rawAmount || 0;
    const currency = rawCurrency || default_currency;
    return (
        <span className={`whitespace-nowrap ${amount < 0 ? 'text-red-500 ' : ' '} ${className}`}>
            <span>{symbol ? getSymbolFromCurrency(currency.toUpperCase()) : currency.toUpperCase()}</span> {(amount || 0).toLocaleString()}
        </span>
    );
};

export default index;
