import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import Popup from './Header/LoginPopUp';
import GamePopup from './Games/Game/Popup';
import { atom, useAtom, useSetAtom } from 'jotai';
import { sidebarIsOpenAtom } from '@/components/ContentLayout/Sidebar';

export const mbSidebarAtom = atom(false);
export const windowWidthAtom = atom(window.innerWidth);
const Layout = () => {
    const [mbSidebar, setMbSidebar] = useAtom(mbSidebarAtom);
    const [windowWidth, setWindowWidth] = useAtom(windowWidthAtom);
    const setsidebarIsOpen = useSetAtom(sidebarIsOpenAtom);

    const handleCloseMbSidebar = () => {
        if (windowWidth <= 1280 && mbSidebar) {
            setsidebarIsOpen(false);
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

        window.addEventListener('resize', handleResize);
        // 清理监听器以避免内存泄漏
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);
    return (
        <>
            <div
                className={`z-50 leftContent overflow-hidden shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] h-screen fixed left-0 top-0 xl:min-w-[80px] transition-all ${windowWidth <= 1280 ? (mbSidebar ? 'w-80' : 'w-0') : ''}
								`}
            >
                <Sidebar />
            </div>
            <div className="rightContent relative w-full xl:pl-20" onClick={handleCloseMbSidebar}>
                <Header />
                <Outlet />
                <Footer />
                <Popup />
                <GamePopup />
            </div>
        </>
    );
};
export default Layout;
