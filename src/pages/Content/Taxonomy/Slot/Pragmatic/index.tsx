import React from 'react';
import { useAtomValue } from 'jotai';
import { windowWidthAtom } from '@/components/ContentLayout';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import Tabs from './Tabs';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';

const index: React.FC = () => {
    const { data, isLoading } = useGetPPTableList();
    console.log('🚀  data:', data);

    const windowWidth = useAtomValue(windowWidthAtom);
    return (
        <div className="relative PopularGames sm:w-full">
            <div className="sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl">
                {windowWidth > 414 ? (
                    <div className="grid grid-cols-11 gap-4 py-9">
                        <div className="col-span-1 flex justify-center">
                            <img src={Icon_Main_Title} alt="" className="" />
                        </div>
                        <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">
                            SLOT
                            {/* <span className="text-black">GAMES</span> */}
                        </span>
                    </div>
                ) : (
                    ''
                )}

                <div className="popularGamesContain sm:py-9">
                    {/* <div className="col-start-1"></div> */}
                    {isLoading ? 'isLoading' : <Tabs data={data} />}
                </div>
            </div>
        </div>
    );
};

export default index;
