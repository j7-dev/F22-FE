import { lazy } from 'react';
import { Route } from 'react-router-dom';

const About = lazy(() => import('@/pages/Content/About'));
const Home = lazy(() => import('@/pages/Content/Home'));
const Slot = lazy(() => import('@/pages/Content/Taxonomy/Slot'));
const Casino = lazy(() => import('@/pages/Content/Taxonomy/Casino'));
const PromotionPage = lazy(() => import('@/pages/Content/Promotion'));
const PragmaticSlot = lazy(() => import('@/pages/Content/Taxonomy/Slot/Pragmatic'));
const AsiaGamingSlot = lazy(() => import('@/pages/Content/Taxonomy/Slot/AsiaGaming'));
const MicroGamingSlot = lazy(() => import('@/pages/Content/Taxonomy/Slot/MicroGaming'));
const Bti = lazy(() => import('@/pages/Content/Taxonomy/Sports/BTI'));
const Gigx = lazy(() => import('@/pages/Content/Taxonomy/Sports/GIGX'));
const TermsOfService = lazy(() => import('@/pages/Content/TermsOfService'));
const Customer = lazy(() => import('@/pages/Content/Customer'));
const Wallet = lazy(() => import('@/pages/Content/Wallet'));
const Faq = lazy(() => import('@/pages/Content/Faq'));
const InPlay = lazy(() => import('@/pages/Content/Taxonomy/InPlay'));
const Sports = lazy(() => import('@/pages/Content/Taxonomy/Sports'));
const Golf = lazy(() => import('@/pages/Content/Taxonomy/Golf'));
const Games = lazy(() => import('@/pages/Content/Taxonomy/Games'));
const Events = lazy(() => import('@/pages/Content/Taxonomy/Events'));

const contentRoutes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/inPlay" element={<InPlay />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/golf" element={<Golf />} />
            <Route path="/slot" element={<Slot />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/games" element={<Games />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/pragmatic/slot" element={<PragmaticSlot />} />
            <Route path="/asiagaming/slot" element={<AsiaGamingSlot />} />
            <Route path="/microgaming/slot" element={<MicroGamingSlot />} />
            <Route path="/bti" element={<Bti />} />
            <Route path="/gigx" element={<Gigx />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/faq" element={<Faq />} />
        </>
    );
};

export default contentRoutes;
