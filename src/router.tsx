import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import PromotionPage from '@/pages/Promotion';
import EvolutionLive from '@/pages/Taxonomy/Live/Evolution';
import PragmaticLive from '@/pages/Taxonomy/Live/Pragmatic';
import SoftGamingsLive from '@/pages/Taxonomy/Live/SoftGamings';
import MicroGamingLive from '@/pages/Taxonomy/Live/MicroGaming';
import EvolutionSlot from '@/pages/Taxonomy/Slot/Evolution';
import PragmaticSlot from '@/pages/Taxonomy/Slot/Pragmatic';
import SoftGamingsSlot from '@/pages/Taxonomy/Slot/SoftGamings';
import MicroGamingSlot from '@/pages/Taxonomy/Slot/MicroGaming';
import Bti from '@/pages/Taxonomy/Sports/BTI';
import Gigx from '@/pages/Taxonomy/Sports/GIGX';
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
                path: '/evolution/live',
                element: <EvolutionLive />,
            },
            {
                path: '/pragmatic/live',
                element: <PragmaticLive />,
            },
            {
                path: '/softgamings/live',
                element: <SoftGamingsLive />,
            },
            {
                path: '/microgaming/live',
                element: <MicroGamingLive />,
            },
            {
                path: '/evolution/slot',
                element: <EvolutionSlot />,
            },
            {
                path: '/pragmatic/slot',
                element: <PragmaticSlot />,
            },
            {
                path: '/softgamings/slot',
                element: <SoftGamingsSlot />,
            },
            {
                path: '/microgaming/slot',
                element: <MicroGamingSlot />,
            },
            {
                path: '/bti',
                element: <Bti />,
            },
            {
                path: '/gigx',
                element: <Gigx />,
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
