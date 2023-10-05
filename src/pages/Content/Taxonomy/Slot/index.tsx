import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { windowWidthAtom } from '@/components/ContentLayout';
import { providerData } from '@/utils/providerData';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import Banner from '@/components/ContentLayout/Banner';
import Pragmatic from './Pragmatic';
import AsiaGaming from './AsiaGaming';
import MicroGaming from './MicroGaming';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';

const slotProviderResource = providerData.filter((item) => item.gameCategories.includes('slot'));

const index: React.FC = () => {
    const { t } = useTranslation();
    const windowWidth = useAtomValue(windowWidthAtom);
    const [tabActiveKey, setTabActiveKey] = useState('pragmaticPlay');
    const handleSwitchTab = (key: string) => {
        setTabActiveKey(key);
    };

    const ShowGames = () => {
        if (tabActiveKey === 'pragmaticPlay') return <Pragmatic />;
        if (tabActiveKey === 'asiaGaming') return <AsiaGaming />;
        if (tabActiveKey === 'microGaming') return <MicroGaming />;
        return <div>Not Provider</div>;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="slotPage sm:my-9 sm:gap-8 my-4 w-full flex flex-col  gap-4">
            <Banner />
            {windowWidth < 414 ? <NewsMarquee speed={15} marqueeText={['Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.']} /> : ''}
            <div className="slotSection relative sm:w-full">
                <div className="sm:mx-4 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl">
                    {windowWidth > 414 ? (
                        <div className="slotTitle grid grid-cols-11 gap-4 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A] ">
                            <div className="col-span-1 flex justify-center">
                                <img src={Icon_Main_Title} alt="" className="" />
                            </div>
                            <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">{t('SLOT')}</span>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="providerSection grid sm:grid-cols-11 sm:px-0  sm:py-2 sm:pt-4 grid-cols-3 pb-3 px-4 gap-2">
                        <div className="hidden sm:block sm:col-start-1"></div>
                        {slotProviderResource.map((item) => {
                            return (
                                <div key={nanoid()} onClick={() => handleSwitchTab(item.value)} className="sm:col-span-3 sm:h-20 sm:aspect-auto aspect-[108/50] cursor-pointer rounded-2xl overflow-hidden col-span-1">
                                    <img src={item?.providerData?.providerMainImg} className="w-full h-full duration-500 hover:scale-125 object-center object-cover" alt="" />
                                </div>
                            );
                        })}
                    </div>
                    <ShowGames />
                </div>
            </div>
        </div>
    );
};

export default index;
