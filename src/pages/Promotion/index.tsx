import React, {
    // forwardRef,
    useEffect,
    useRef,
    useState,
    // useMemo,
    // useCallback,
} from 'react';
import Slider from 'react-slick';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Promotion from '@/components/Layout/Promotions/Promotion';

const PromotionPage: React.FC = () => {
    const { t } = useTranslation();
    const mainSliderRef = useRef(null);
    const navSliderRef = useRef(null);
    const [
        Settings,
        setSettings,
    ] = useState({
        mainSettings: {},
        navSettings: {},
    });

    useEffect(() => {
        if (mainSliderRef.current && navSliderRef.current) {
            const newMainSettings = {
                dots: false,
                arrows: false,
                infinite: true,
                speed: 0,
                slidesToShow: 4,
                swipe: false,
                asNavFor: navSliderRef.current,
            };
            const newNavSettings = {
                dots: false,
                arrows: true,
                infinite: true,
                speed: 0,
                slidesToScroll: 1,
                slidesToShow: 5,
                swipe: false,
                asNavFor: mainSliderRef.current,
                focusOnSelect: true,
                centerPadding: '0px',
            };
            setSettings({
                mainSettings: newMainSettings,
                navSettings: newNavSettings,
            });
        }
    }, [
        mainSliderRef,
        navSliderRef,
    ]);

    return (
        <>
            <div className="ExclusivePromotions w-[1260px] min-h-[590px] px-[23px] py-10 m-auto flex flex-col gap-[30px]">
                <div className="font-bold text-2xl">
                    {t('Exclusive Promotions')}
                </div>
                <Slider {...Settings.mainSettings} ref={mainSliderRef}>
                    {new Array(6).fill(0).map((_, _index) => (
                        <div
                            key={nanoid()}
                            className="PromotionWrap w-full px-1  cursor-pointer"
                        >
                            <div className="border border-solid border-[#DADCE0]">
                                <div className="promotionImg p-1 ">
                                    <Promotion />
                                </div>
                                <div className="promotionInfo py-2 px-4 min-h-[95px]">
                                    <h3 className="my-0 text-[#444] font-bold text-sm">
                                        Test{_index + 1}
                                    </h3>
                                    <span className="mt-1 text-[#aaa] font-bold text-xs">
                                        2022-10-13
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="navSlider w-full flex justify-center">
                    <div className="w-[400px] flex flex-col justify-center ">
                        <Slider {...Settings.navSettings} ref={navSliderRef}>
                            {new Array(6).fill(0).map((_, _index) => (
                                <span
                                    key={nanoid()}
                                    className="navSlickDots flex justify-center items-center text-sm text-[#2B3240] font-bold"
                                >
                                    <span className="flex justify-center items-center w-10 h-10 border border-solid border-[#e6e6e6] rounded-full cursor-pointer hover:bg-[#4ba1fa] hover:text-white">
                                        {_index + 1}
                                    </span>
                                </span>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PromotionPage;
