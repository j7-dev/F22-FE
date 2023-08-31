import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import PromotionPage from '@/pages/Promotion';
import Live from '@/pages/Taxonomy/Live';
import Evolution from '@/pages/Taxonomy/Evolution';
import Pragmatic from '@/pages/Taxonomy/Pragmatic';
import Slot from '@/pages/Taxonomy/Slot';
import TermsOfService from '@/pages/TermsOfService';
import Customer from '@/pages/Customer';
import Wallet from '@/pages/Wallet';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/promotion',
                element: <PromotionPage />,
            },
            {
                path: '/live',
                element: <Live />,
            },
            {
                path: '/evolution',
                element: <Evolution />,
            },
            {
                path: '/pragmatic',
                element: <Pragmatic />,
            },
            {
                path: '/slots',
                element: <Slot />,
            },
            {
                path: '/terms-of-service',
                element: <TermsOfService />,
            },
            {
                path: '/customer',
                element: <Customer />,
            },
            {
                path: '/wallet',
                element: <Wallet />,
            },
        ],
    },
]);

export default router;
