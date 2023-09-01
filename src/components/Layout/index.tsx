import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import Popup from './LoginPopUp';

const Layout = () => (
    <>
        <div className="z-50 leftContent w-20 h-screen fixed left-0 top-0 ">
            <Sidebar />
        </div>
        <div className=" rightContent relative pl-20">
            <Header />
            <Outlet />
            <Footer />
            <Popup />
        </div>
    </>
);

export default Layout;
