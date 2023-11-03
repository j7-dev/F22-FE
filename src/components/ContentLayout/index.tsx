import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import GamePopup from './Games/Game/Popup';
import { LiveChatWidget } from '@livechat/widget-react';

//TODO 等Kevin把LiveChat註冊好再放回來
const Layout = () => {
    return (
        <div className="contentLayout">
            <div className={`leftContent peer z-50 h-screen fixed start-0 duration-300 md:w-[88px] md:hover:w-80 md:shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] sm:overflow-hidden `}>
                <Sidebar />
            </div>
            <div className={`rightContent relative w-auto bg-[#F8F9FF] duration-300 md:ml-[88px] peer-hover:md:ml-80`}>
                <Header />
                <Outlet />
                <Footer />
                <GamePopup />
            </div>
            <LiveChatWidget license="16519437" visibility="minimized" />
        </div>
    );
};
export default Layout;
