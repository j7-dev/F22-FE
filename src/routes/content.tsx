import { lazy } from 'react';
import { Route } from 'react-router-dom';

const About = lazy(() => import('@/pages/Content/About'));
const Home = lazy(() => import('@/pages/Content/Home'));
const Slot = lazy(() => import('@/pages/Content/Taxonomy/Slot'));
const Casino = lazy(() => import('@/pages/Content/Taxonomy/Casino'));
const PromotionPage = lazy(() => import('@/pages/Content/Promotion'));
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
const Token = lazy(() => import('@/pages/Content/Taxonomy/Token'));
const SportsRegulations = lazy(() => import('@/pages/Content/SportsRegulations'));
const BattingRegulations = lazy(() => import('@/pages/Content/BattingRegulations'));

const contentRoutes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/inPlay" element={<InPlay />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/golf" element={<Golf />} />
            <Route path="/slot" element={<Slot />} />
            {/* 使Slot可以網址帶入參數查詢相對應的provider */}
            <Route path="/slot/:provider" element={<Slot />} />
            <Route path="/casino/:category" element={<Casino />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/games" element={<Games />} />
            <Route path="/events" element={<Events />} />
            <Route path="/token" element={<Token />} />
            <Route path="/about" element={<About />} />
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/bti" element={<Bti />} />
            <Route path="/gigx" element={<Gigx />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/sports-regulations" element={<SportsRegulations />} />
            <Route path="/batting-regulations" element={<BattingRegulations />} />
        </>
    );
};

export default contentRoutes;
