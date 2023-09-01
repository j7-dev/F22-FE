import React from 'react';
import { TRoute } from '@/types';
import ContentAbout from '@/pages/Content/About';
import ContentHome from '@/pages/Content/Home';
import ContentPromotionPage from '@/pages/Content/Promotion';
import ContentLive from '@/pages/Content/Taxonomy/Live';
import ContentEvolution from '@/pages/Content/Taxonomy/Evolution';
import ContentPragmatic from '@/pages/Content/Taxonomy/Pragmatic';
import ContentSlot from '@/pages/Content/Taxonomy/Slot';
import ContentTermsOfService from '@/pages/Content/TermsOfService';
import ContentCustomer from '@/pages/Content/Customer';
import ContentWallet from '@/pages/Content/Wallet';

const contentRoutes: TRoute[] = [
    {
        path: '/',
        element: <ContentHome />,
    },
    {
        path: '/about',
        element: <ContentAbout />,
    },
    {
        path: '/promotion',
        element: <ContentPromotionPage />,
    },
    {
        path: '/live',
        element: <ContentLive />,
    },
    {
        path: '/evolution',
        element: <ContentEvolution />,
    },
    {
        path: '/pragmatic',
        element: <ContentPragmatic />,
    },
    {
        path: '/slots',
        element: <ContentSlot />,
    },
    {
        path: '/terms-of-service',
        element: <ContentTermsOfService />,
    },
    {
        path: '/customer',
        element: <ContentCustomer />,
    },
    {
        path: '/wallet',
        element: <ContentWallet />,
    },
];

export default contentRoutes;
