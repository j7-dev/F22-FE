import { Route } from 'react-router-dom';
import About from '@/pages/Content/About';
import Home from '@/pages/Content/Home';
import Slot from '@/pages/Content/Taxonomy/Slot';
import Casino from '@/pages/Content/Taxonomy/Casino';
import PromotionPage from '@/pages/Content/Promotion';
import PragmaticSlot from '@/pages/Content/Taxonomy/Slot/Pragmatic';
import AsiaGamingSlot from '@/pages/Content/Taxonomy/Slot/AsiaGaming';
import MicroGamingSlot from '@/pages/Content/Taxonomy/Slot/MicroGaming';
import Bti from '@/pages/Content/Taxonomy/Sports/BTI';
import Gigx from '@/pages/Content/Taxonomy/Sports/GIGX';
import TermsOfService from '@/pages/Content/TermsOfService';
import Customer from '@/pages/Content/Customer';
import Wallet from '@/pages/Content/Wallet';
import Faq from '@/pages/Content/Faq';
import InPlay from '@/pages/Content/Taxonomy/InPlay';
import Sports from '@/pages/Content/Taxonomy/Sports';
import Golf from '@/pages/Content/Taxonomy/Golf';
import Games from '@/pages/Content/Taxonomy/Games';
import Events from '@/pages/Content/Taxonomy/Events';

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
