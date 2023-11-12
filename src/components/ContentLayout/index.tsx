import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import GamePopup from './Games/Game/Popup';
import LiveChatWidget from './LiveChatWidget';
const Layout = () => {
    //取得mobileBottom的高度
    const mobileBottom = document.querySelector('.mobileBottom');
    const mobileBottomHeight = mobileBottom?.clientHeight;
    return (
        <div className="contentLayout">
            <div className={`leftContent peer z-50 h-screen fixed start-0 duration-300 md:w-[88px] md:hover:w-80 md:shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] md:overflow-hidden `}>
                <Sidebar />
            </div>
            <div className={`pb-[${mobileBottomHeight}px] rightContent relative w-auto bg-[#F8F9FF] duration-300  md:ml-[88px] peer-hover:md:ml-80`}>
                <Header />
                <Outlet />
                <Footer />
                <GamePopup />
            </div>
            <LiveChatWidget />
        </div>
    );
};
export default Layout;
