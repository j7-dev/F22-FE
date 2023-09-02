import { TRoute } from '@/types';
import About from '@/pages/Content/About';
import Home from '@/pages/Content/Home';
import PromotionPage from '@/pages/Content/Promotion';
import EvolutionLive from '@/pages/Content/Taxonomy/Live/Evolution';
import PragmaticLive from '@/pages/Content/Taxonomy/Live/Pragmatic';
import SoftGamingsLive from '@/pages/Content/Taxonomy/Live/SoftGamings';
import MicroGamingLive from '@/pages/Content/Taxonomy/Live/MicroGaming';
import EvolutionSlot from '@/pages/Content/Taxonomy/Slot/Evolution';
import PragmaticSlot from '@/pages/Content/Taxonomy/Slot/Pragmatic';
import SoftGamingsSlot from '@/pages/Content/Taxonomy/Slot/SoftGamings';
import MicroGamingSlot from '@/pages/Content/Taxonomy/Slot/MicroGaming';
import Bti from '@/pages/Content/Taxonomy/Sports/BTI';
import Gigx from '@/pages/Content/Taxonomy/Sports/GIGX';
import TermsOfService from '@/pages/Content/TermsOfService';
import Customer from '@/pages/Content/Customer';
import Wallet from '@/pages/Content/Wallet';

const Routes: TRoute[] = [
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
        path: '/evolution',
        element: <EvolutionLive />,
    },
    {
        path: '/evolution/live',
        element: <EvolutionLive />,
    },
    {
        path: '/pragmatic',
        element: <PragmaticLive />,
    },
    {
        path: '/pragmatic/live',
        element: <PragmaticLive />,
    },
    {
        path: '/softgamings',
        element: <SoftGamingsLive />,
    },
    {
        path: '/softgamings/live',
        element: <SoftGamingsLive />,
    },
    {
        path: '/microgaming',
        element: <MicroGamingLive />,
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
];

export default Routes;
