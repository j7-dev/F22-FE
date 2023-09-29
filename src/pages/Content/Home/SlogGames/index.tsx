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
        label: 'All Games Provider',
        value: 'allGamesProvider',
        providerData: {
            providerMainImg: sloggameMgImg,
            providerSmallImg: sloggameMgImg,
            providerFavIcon: microgamingProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: '/microgaming',
        },
    },
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

    // console.log('poplarGamesArray', poplarGamesArray);
    return (
        <div className="relative PoplarGames md:w-full mb-3">
            <div className="mx-4 rounded-2xl shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)]">
                <div className="px-12 py-9 flex gap-9 items-center md:justify-start justify-center">
                    <img src={Icon_Main_Title} alt="" />
                    <span className="font-bold text-3xl text-[#9680EA] flex gap-4">
                        SLOT<span className="text-black">GAMES</span>
                    </span>
                </div>
                <Tabs data={slogGamesArray} />
            </div>
        </div>
    );
};

export default index;
