import React from 'react';
import eventPromotion from '@/assets/images/event-Promotion.jpg';

const Promotion: React.FC = () => (
    <div className="PromotionImg w-full relative">
        <img
            className="w-full align-top"
            src={eventPromotion}
            alt="Promotion"
        />
    </div>
);

export default Promotion;
