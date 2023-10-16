import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import Popup from './Header/LoginPopUp';
import GamePopup from './Games/Game/Popup';

const Layout = () => {
    return (
        <div className="contentLayout">
            <div className={`leftContent peer z-50 h-screen fixed start-0 duration-300 sm:w-[88px] sm:hover:w-80 sm:shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] sm:overflow-hidden `}>
                <Sidebar />
            </div>
            <div className={`rightContent relative w-full bg-[#F8F9FF] duration-300 sm:pl-[88px] peer-hover:sm:pl-80`}>
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
