import React from 'react';
import Amount from '@/components/Admin/Amount';
import { Link } from 'react-router-dom';
import { TDepositBonus } from '@/types';

const index: React.FC<{
    deposit_amount: number;
    deposit_bonus: TDepositBonus | null;
}> = ({ deposit_amount, deposit_bonus }) => {
    if (!deposit_bonus) return <Amount amount={0} />;

    const bonus_rate = deposit_bonus?.bonus_rate || 0;
    const deposit_bonus_amount = bonus_rate * deposit_amount;
    return (
        <Link to={`/refine/promotion/deposit-bonuses/edit/${deposit_bonus?.id}`}>
            <Amount amount={deposit_bonus_amount} />
        </Link>
    );
};

export default index;
