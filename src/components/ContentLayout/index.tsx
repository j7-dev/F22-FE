import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import GamePopup from './Games/Game/Popup';

const Layout = () => {
    return (
        <div className="contentLayout">
            <div className={`leftContent peer z-50 h-screen fixed start-0 duration-300 md:w-[88px] md:hover:w-80 md:shadow-[2px_0px_20px_0px_rgba(163,112,237,0.25)] sm:overflow-hidden `}>
                <Sidebar />
            </div>
            <div className={`rightContent relative w-full bg-[#F8F9FF] duration-300 md:pl-[88px] peer-hover:md:pl-80`}>
                <Header />
                <Outlet />
                <Footer />
                <GamePopup />
            </div>
        </div>
    );
};
export default Layout;
