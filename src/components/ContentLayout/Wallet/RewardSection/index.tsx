import React from 'react';
import CouponHistory from './CouponHistory';
// import BonusPoint from './BonusPoint';

interface RewardSectionProps {
    section?: string;
}
const index: React.FC<RewardSectionProps> = ({ section }) => {
    if (section === 'CouponHistory') return <CouponHistory />;
    // if (section === 'BonusPoint') return <BonusPoint />;
    return <></>;
};

export default index;
