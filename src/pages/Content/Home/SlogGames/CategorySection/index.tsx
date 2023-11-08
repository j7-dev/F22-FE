import { useState } from 'react';
import { TGameProvider } from '@/types/games';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon_Main_Title from '@/assets/images/icon_main_title.svg';

/**
 * 渲染輪播圖內畫面
 * 接收參數為遊戲分類名稱與該分類廠商資料
 */

const CategorySection = ({ categoryName, provider = [] }: { categoryName: string; provider?: TGameProvider[] }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(provider[0].value);

    //切換遊戲列表
    const handleSwitchTab = (key: string) => () => {
        setActiveTab(key);
    };
    //顯示哪一個遊戲廠商
    const fxnProvider = provider.filter((item) => item.value === activeTab);
    //帶入參數，跳轉遊戲頁面
    const navigate = useNavigate();
    const handleStartGame = ({ taxonomy, path }: { taxonomy: TGameProvider; path?: string | undefined }) => {
        navigate(`${taxonomy.gameCategories[0]}/${path}`);
    };
    return (
        <>
            <div className="md:grid grid-cols-11 gap-4 pb-0.5 py-9 border-0 border-solid border-b border-[#d5d8dc] shadow-[0_4.5px_0_0_#0000000D,0_3.5px_0_0_#FFFFFF,0_1.5px_0_0_#0000001A]">
                <div className="col-span-1 flex justify-center">
                    <img src={Icon_Main_Title} alt="" className="" />
                </div>
                <span className="col-span-1 font-bold text-3xl text-[#9680EA] -ml-3">{t(categoryName)}</span>
                {/* 篩選條 */}
                <div className="filterBar col-start-2 col-span-9 flex gap-2.5 -ml-2">
                    {provider.map((item: TGameProvider) => {
                        return (
                            <div key={nanoid()} onClick={handleSwitchTab(item.value)} className={`filterTab relative cursor-pointer p-2`}>
                                <span className={`${activeTab === item.value ? 'text-black font-bold' : 'font-normal'} text-base`}>{item.label}</span>
                                <div className={`activeBorder ${activeTab === item.value ? 'h-1 rounded-full bg-[#9680EA]' : 'h-0'} absolute top-[96%] left-0 w-full h-0`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* 廠商內容 */}
            <div className="md:py-9">
                {fxnProvider.map((item: TGameProvider) => {
                    return (
                        <div className="providerInfo h-full w-full grid grid-cols-11 gap-4">
                            <div className="col-start-1"></div>
                            <div onClick={() => handleStartGame({ taxonomy: item, path: item?.providerData?.providerPath as string })} className="cursor-pointer providerMainImg overflow-hidden col-span-6 rounded-2xl ">
                                <img src={item?.providerData?.providerMainImg} alt="" className="w-full aspect-[577/320] min-h-[369px] duration-500 hover:scale-125  object-cover" />
                            </div>
                            <div className="col-span-3 flex flex-col items-center justify-center">
                                <img className="providerFavIcon w-full" src={item?.providerData?.providerFavIcon} />
                                <p className="providerDescribe text-xs font-bold">{item?.providerData?.providerDescribe}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* 切換小圖 */}
            <div className="grid grid-cols-11 gap-4 pb-10">
                <div className="col-start-1"></div>
                {provider.map((item: TGameProvider) => {
                    return (
                        <div key={nanoid()} onMouseEnter={handleSwitchTab(item.value)} className="h-20 rounded-2xl overflow-hidden col-span-3">
                            <div className="w-full h-full duration-500 hover:scale-125 bg-cover bg-center" style={{ background: `url(${item?.providerData?.providerMainImg})` }}>
                                <div className="w-full h-full px-4 py-6 flex text-end bg-gradient-to-r from-transparent from-40% to-[#5932EA]">
                                    <img className="w-full h-full object-right object-contain" src={item?.providerData?.providerWhiteIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default CategorySection;
