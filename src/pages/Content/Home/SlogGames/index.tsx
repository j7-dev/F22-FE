import React from 'react';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import Tabs from './Tabs';
import newBanner1 from '@/assets/images/messageImage_1695738233708.jpg';

const index: React.FC = () => {
    const poplarGamesArray = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: [
                {
                    gameID: '1',
                    gameImg: newBanner1,
                },
                {
                    gameID: '2',
                    gameImg: newBanner1,
                },
            ],
        },
        {
            label: 'Sport',
            value: 'sport',
            gameData: [
                {
                    gameID: '1',
                    gameImg: newBanner1,
                },
                {
                    gameID: '2',
                    gameImg: newBanner1,
                },
            ],
        },
        {
            label: 'Live Casino',
            value: 'liveCasino',
            gameData: [
                {
                    gameID: '1',
                    gameImg: newBanner1,
                },
            ],
        },
        {
            label: 'Slot Games',
            value: 'slotGames',
            gameData: [
                {
                    gameID: '1',
                    gameImg: newBanner1,
                },
            ],
        },
    ];
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
                <Tabs data={poplarGamesArray} />
            </div>
        </div>
    );
};

export default index;
