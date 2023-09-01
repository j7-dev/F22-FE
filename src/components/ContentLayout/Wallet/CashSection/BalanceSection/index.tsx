import React from 'react';
import { useTranslation } from 'react-i18next';
import wallet1058Icon from '@/assets/images/wallet-icon-1058.png';
import wallet1118Icon from '@/assets/images/wallet-icon-1118.png';

const BalanceSection: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="BalanceSection w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div className="totalBalance h-10 bg-[#F3F3F4] rounded-lg flex justify-between items-center px-4 cursor-pointer">
                <span className="text-sm font-bold text-[#2B3240]">
                    {t('Total Balance')}
                </span>
                <span className="text-sm font-bold text-[#2B3240]">¥ 0</span>
            </div>
            <div className="balanceContainer flex flex-col gap-4">
                <div className="liveBalanceContainer">
                    <span className="text-sm font-bold text-[#2b324080] py-2.5 px-4">
                        {t('Live Casino')}
                    </span>
                    <div className="balanceListContainer flex flex-col gap-4 mx-4 ">
                        <div className="balanceList h-10 gap-2.5 rounded-lg flex justify-between items-center ">
                            <div className="balanceInfo flex justify-start items-center gap-2.5">
                                <img src={wallet1058Icon} alt="" />
                                <span className="text-sm font-bold text-[#2B3240]">
                                    {t('Evolution Live')}
                                </span>
                            </div>
                            <span className="balanceNumber flex justify-center items-center text-sm font-bold text-[#2B3240]">
                                ¥ 0
                            </span>
                        </div>
                    </div>
                    <div className="balanceListContainer flex flex-col gap-4 mx-4 ">
                        <div className="balanceList h-10 gap-2.5 rounded-lg flex justify-between items-center ">
                            <div className="balanceInfo flex justify-start items-center gap-2.5">
                                <img src={wallet1118Icon} alt="" />
                                <span className="text-sm font-bold text-[#2B3240]">
                                    Pragmatic Play Live
                                </span>
                            </div>
                            <span className="balanceNumber flex justify-center items-center text-sm font-bold text-[#2B3240]">
                                ¥ 0
                            </span>
                        </div>
                    </div>
                </div>
                <div className="slotBalanceContainer">
                    <span className="text-sm font-bold text-[#2b324080] py-2.5 px-4">
                        {t('Slot Game')}
                    </span>
                    <div className="balanceListContainer flex flex-col gap-4 mx-4 ">
                        <div className="balanceList h-10 gap-2.5 rounded-lg flex justify-between items-center ">
                            <div className="balanceInfo flex justify-start items-center gap-2.5">
                                <img src={wallet1058Icon} alt="" />
                                <span className="text-sm font-bold text-[#2B3240]">
                                    Evolution Live
                                </span>
                            </div>
                            <span className="balanceNumber flex justify-center items-center text-sm font-bold text-[#2B3240]">
                                ¥ 0
                            </span>
                        </div>
                    </div>
                    <div className="balanceListContainer flex flex-col gap-4 mx-4 ">
                        <div className="balanceList h-10 gap-2.5 rounded-lg flex justify-between items-center ">
                            <div className="balanceInfo flex justify-start items-center gap-2.5">
                                <img src={wallet1118Icon} alt="" />
                                <span className="text-sm font-bold text-[#2B3240]">
                                    Pragmatic Play Live
                                </span>
                            </div>
                            <span className="balanceNumber flex justify-center items-center text-sm font-bold text-[#2B3240]">
                                ¥ 0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceSection;
