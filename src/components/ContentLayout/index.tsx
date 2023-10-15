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
//FIXME windowWidthAtom / mbSidebarAtom Atom 有沒有更好的做法
// windowWidthAtom 用來判斷要不要呈現手機版布局
// mbSidebarAtom 用來判斷手機版選單要不要打開
//mbSidebarAtom 跟 sidebarIsOpenAtom最大不同是未打開前寬度是0或是w-20
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
