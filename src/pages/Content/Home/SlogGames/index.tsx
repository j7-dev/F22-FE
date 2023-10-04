import React from 'react';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import Tabs from './Tabs';
import sloggameAgImg from '@/assets/images/sloggame_ag.jpg';
import sloggameMgImg from '@/assets/images/sloggame_mg.jpg';
import sloggamePpImg from '@/assets/images/sloggame_pp.jpg';
import pragmaticplayProviderImg2 from '@/assets/images/game_provider/pragmaticplay2.png';
import microgamingProviderImg2 from '@/assets/images/game_provider/microgaming2.png';
import asiagamingProviderImg2 from '@/assets/images/game_provider/asiagaming2.png';

export const slogGamesArray = [
    {
        label: 'Pragmatic Play',
        value: 'pragmaticPlay',
        providerData: {
            providerMainImg: sloggamePpImg,
            providerSmallImg: sloggamePpImg,
            providerFavIcon: pragmaticplayProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: '/pragmatic',
        },
    },
    {
        label: 'Micro Gaming',
        value: 'microGaming',
        providerData: {
            providerMainImg: sloggameMgImg,
            providerSmallImg: sloggameMgImg,
            providerFavIcon: microgamingProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: '/microgaming',
        },
    },
    {
        label: 'Asia Gaming',
        value: 'asiaGaming',
        providerData: {
            providerMainImg: sloggameAgImg,
            providerSmallImg: sloggameAgImg,
            providerFavIcon: asiagamingProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: '/asiagaming',
        },
    },
];

const index: React.FC = () => {
    //滚球
    // 体育
    // 高尔夫
    // 视讯
    // 电子
    // 小游戏
    // 优惠

    // console.log('PopularGamesArray', PopularGamesArray);
    return (
        <div className="relative PopularGames md:w-full">
            <div className="mx-4 rounded-2xl shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
                <div className="grid grid-cols-11 gap-4 py-9">
                    <div className="col-span-1 flex justify-center">
                        <img src={Icon_Main_Title} alt="" className="" />
                    </div>

                    <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">
                        SLOT
                        {/* <span className="text-black">GAMES</span> */}
                    </span>
                </div>
                <Tabs data={slogGamesArray} />
            </div>
        </div>
    );
};

export default index;
