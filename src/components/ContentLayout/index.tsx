import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import Popup from './LoginPopUp';
import { atom, useAtom, useAtomValue } from 'jotai';

export const mbSidebarAtom = atom(false);
export const windowWidthAtom = atom(window.innerWidth);
const Layout = () => {
    const mbSidebar = useAtomValue(mbSidebarAtom);
    const [windowWidth, setWindowWidth] = useAtom(windowWidthAtom);

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
                className={`z-50 leftContent overflow-hidden h-screen fixed left-0 top-0 md:min-w-[80px]
								${windowWidth <= 768 ? (mbSidebar ? '' : 'w-0') : ''}
								`}
            >
                <Sidebar />
            </div>
            <div className="rightContent relative md:pl-20 ">
                <Header />
                <Outlet />
                <Footer />
                <Popup />
            </div>
        </>
    );
};
export default Layout;
