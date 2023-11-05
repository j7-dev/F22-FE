import React from 'react';
import { Link } from 'react-router-dom';
import { TDepositBonus } from '@/types';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const index: React.FC<{
    deposit_amount: number;
    deposit_bonus: TDepositBonus | null;
}> = ({ deposit_amount, deposit_bonus }) => {
    if (!deposit_bonus) return <>0</>;

    const bonus_rate = deposit_bonus?.bonus_rate || 0;
    const deposit_bonus_amount = bonus_rate * deposit_amount;
    return (
        <Link to={`/refine/promotion/deposit-bonuses/edit/${deposit_bonus?.id}`}>
            <SimpleAmount amount={deposit_bonus_amount} />
        </Link>
    );
};

export default index;
