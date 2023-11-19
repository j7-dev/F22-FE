import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import GamePopup from './Games/Game/Popup'; //TODO 這是3小?的彈窗,之後有時間移除
import LiveChatWidget from './LiveChatWidget';
const Layout = () => {
    //取得mobileBottom的高度
    const mobileBottom = document.querySelector('.mobileBottom');
    const mobileBottomHeight = mobileBottom?.clientHeight;
    console.log('更新');
    return (
        <div className="contentLayout">
            <div className={`leftContent peer z-50 h-screen fixed start-0 duration-300 md:w-[88px] md:hover:w-80 md:shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] md:overflow-hidden `}>
                <Sidebar />
            </div>
            <div style={{ paddingBottom: `${mobileBottomHeight}px` }} className={`rightContent relative w-auto bg-[#F8F9FF] duration-300  md:ml-[88px] peer-hover:md:ml-80`}>
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
