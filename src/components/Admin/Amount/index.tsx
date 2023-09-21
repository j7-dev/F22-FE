import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

const index: React.FC<{
    amount: number;
    currency: string;
    symbol?: boolean;
}> = ({ amount, currency, symbol = false }) => {
    return (
        <span className="text-nowrap">
            <span>{symbol ? getSymbolFromCurrency(currency.toUpperCase()) : currency.toUpperCase()}</span> {amount.toLocaleString()}
        </span>
    );
};

export default index;
