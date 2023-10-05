import React from 'react';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';
import Tabs from './Tabs';
import { providerData } from '@/utils/providerData';

export const slogGamesResource = providerData.filter((item) => item.gameCategories.includes('slot'));

const index: React.FC = () => {
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
                <Tabs data={slogGamesResource} />
            </div>
        </div>
    );
};

export default index;
