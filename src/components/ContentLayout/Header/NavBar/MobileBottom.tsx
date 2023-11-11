import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { useAtom } from 'jotai';

const MobileBottom = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
    const inDeposit = window.location.pathname === '/wallet' && activeMenu === 'deposit' ? 'active' : '';
    const inWithdraw = window.location.pathname === '/wallet' && activeMenu === 'withdraw' ? 'active' : '';
    const inHome = window.location.pathname === '/' ? 'active' : '';
    const inEvents = window.location.pathname === '/events' ? 'active' : '';
    const inCoupon = window.location.pathname === '/wallet' && activeMenu === 'couponHistory' ? 'active' : '';
    //前往指定頁面
    const handleClick =
        ({ path, atom }: { path: string; atom?: string }) =>
        () => {
            if (atom) setActiveMenu(atom);
            navigate(path);
        };

    return (
        <div className="mobileBottom bg-[#F8F9FF] pt-6 fixed bottom-0 left-0 h-fit w-full z-50">
            <div className="mobileSection md:hidden grid bg-white grid-cols-5 w-full px-3 pb-[30px] gap-2">
                <div onClick={handleClick({ path: '/wallet', atom: 'deposit' })} className={`${inDeposit} btnWrap deposit pt-3`}>
                    <div className="flex flex-col justify-center items-center gap-1.5">
                        <div className="favicon w-full h-6" />
                        <span className="text-xs font-normal">{t('Deposit')}</span>
                    </div>
                </div>
                <div onClick={handleClick({ path: '/wallet', atom: 'withdraw' })} className={`${inWithdraw} btnWrap withdraw pt-3`}>
                    <div className="flex flex-col justify-center items-center gap-1.5">
                        <div className="favicon w-full h-6 object-contain object-center" />
                        <span className="text-xs font-normal">{t('Withdraw')}</span>
                    </div>
                </div>
                <div onClick={handleClick({ path: '/' })} className={`${inHome} btnWrap home pt-3`}>
                    <div className="flex flex-col justify-center items-center gap-1.5">
                        <div className="favicon w-full h-6 object-contain object-center" />
                        <span className="text-xs font-normal">{t('Home')}</span>
                    </div>
                </div>
                <div onClick={handleClick({ path: '/events' })} className={`${inEvents} btnWrap events pt-3`}>
                    <div className="flex flex-col justify-center items-center gap-1.5">
                        <div className="favicon w-full h-6 object-contain object-center" />
                        <span className="text-xs font-normal">{t('Events')}</span>
                    </div>
                </div>
                <div onClick={handleClick({ path: '/wallet', atom: 'couponHistory' })} className={`${inCoupon} btnWrap coupon pt-3`}>
                    <div className="flex flex-col justify-center items-center gap-1.5">
                        <div className="favicon w-full h-6 object-contain object-center" />
                        <span className="text-xs font-normal">{t('쿠폰함')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileBottom;
