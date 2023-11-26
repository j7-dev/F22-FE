import React from 'react';
import { Link } from 'react-router-dom';
import { TDepositBonus } from '@/types';
import SimpleAmount from '@/components/Admin/SimpleAmount';

const index: React.FC<{
    deposit_amount: number;
    deposit_bonus: TDepositBonus | null;
}> = ({ deposit_amount, deposit_bonus }) => {
    const min_deposit_amount = deposit_bonus?.min_deposit_amount || 0;

    if (!deposit_bonus || deposit_amount < min_deposit_amount) return <>0</>;

    const bonus_rate = (deposit_bonus?.bonus_rate || 0) / 100;
    const max_bonus_amount = deposit_bonus?.max_bonus_amount || 0;
    const deposit_bonus_amount = bonus_rate * deposit_amount;

    const final_bonus_amount = Math.min(deposit_bonus_amount, max_bonus_amount);
    return (
        <>
            <div>
                <SimpleAmount amount={final_bonus_amount} />
            </div>
            <Link to={`/refine/promotion/deposit-bonuses/edit/${deposit_bonus?.id}`}>{deposit_bonus?.label}</Link>
        </>
    );
};

export default index;
