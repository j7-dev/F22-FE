import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { throttle } from 'lodash-es';
import { atom, useAtom } from 'jotai';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import Popup from './Header/LoginPopUp';
import GamePopup from './Games/Game/Popup';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';

export const mbSidebarAtom = atom(false);
export const windowWidthAtom = atom(window.innerWidth);
const Layout = () => {
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const [windowWidth, setWindowWidth] = useAtom(windowWidthAtom);
    const [_sidebarIsOpen, setSidebarIsOpen] = useAtom(sidebarIsOpenAtom);

    const handleCloseMbSidebar = () => {
        if (windowWidth <= 414 && mbSidebar) {
            setSidebarIsOpen(false);
            setMbSidebar(false);
        }
    };

    //路徑發生變化時，關閉手機版選單
    useEffect(() => {
        // 监听窗口大小变化
        // console.log('windowWidth', windowWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', throttle(handleResize, 500));
        // 清理监听器以避免内存泄漏
        return () => {
            window.removeEventListener('resize', throttle(handleResize, 500));
        };
    }, [windowWidth]);
    return (
        <div className="contentLayout">
            <div className={`leftContent z-50 overflow-hidden shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] xl:min-w-[88px] h-screen fixed left-0 top-0  transition-all ${mbSidebar ? 'active' : ''}`}>
                <Sidebar />
            </div>
            <div className={`rightContent relative w-full bg-[#F8F9FF]`} onClick={handleCloseMbSidebar}>
                <Header />
                <Outlet />
                <Footer />
                <Popup />
                <GamePopup />
            </div>
        </div>
    );
};
export default Layout;
