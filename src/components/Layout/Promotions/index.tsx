import React from 'react';
import Slider from 'react-slick';
import { nanoid } from 'nanoid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Promotion from './Promotion';

const Promotions: React.FC = () => {
    const settings = {
        accessibility: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        variableWidth: true,
    };
    return (
        <div className="my-20 max-w-7xl mx-auto ">
            <div className="PromotionHeader flex flex-row justify-between my-2">
                <span className="PromotionTaxonomyTitle text-base tracking-wide font-bold ">
                    Top Promotions
                </span>
                <span className="PromotionLink text-[#357ACB] text-sm tracking-wide">
                    View All
                </span>
            </div>
            <Slider {...settings}>
                {new Array(5).fill(0).map(() => (
                    <div
                        key={nanoid()}
                        className="PromotionWrap w-[350px] px-1"
                    >
                        <Promotion />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Promotions;
