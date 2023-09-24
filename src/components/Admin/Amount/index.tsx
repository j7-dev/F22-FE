import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

const index: React.FC<{
    amount: number | null;
    currency: string | null;
    symbol?: boolean;
}> = ({ amount: rawAmount, currency: rawCurrency, symbol = false }) => {
    const amount = rawAmount || 0;
    const currency = rawCurrency || '';
    return (
        <span className="text-nowrap">
            <span>{symbol ? getSymbolFromCurrency(currency.toUpperCase()) : currency.toUpperCase()}</span> {amount.toLocaleString()}
        </span>
    );
};

export default index;
