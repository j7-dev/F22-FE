import { Route } from 'react-router-dom';
import About from '@/pages/Content/About';
import Home from '@/pages/Content/Home';
import Slot from '@/pages/Content/Taxonomy/Slot';
import PromotionPage from '@/pages/Content/Promotion';
import EvolutionLive from '@/pages/Content/Taxonomy/Live/Evolution';
import PragmaticLive from '@/pages/Content/Taxonomy/Live/Pragmatic';
import AsiaGamingLive from '@/pages/Content/Taxonomy/Live/AsiaGaming';
import MicroGamingLive from '@/pages/Content/Taxonomy/Live/MicroGaming';
import PragmaticSlot from '@/pages/Content/Taxonomy/Slot/Pragmatic';
import AsiaGamingSlot from '@/pages/Content/Taxonomy/Slot/AsiaGaming';
import MicroGamingSlot from '@/pages/Content/Taxonomy/Slot/MicroGaming';
import Bti from '@/pages/Content/Taxonomy/Sports/BTI';
import Gigx from '@/pages/Content/Taxonomy/Sports/GIGX';
import TermsOfService from '@/pages/Content/TermsOfService';
import Customer from '@/pages/Content/Customer';
import Wallet from '@/pages/Content/Wallet';

const contentRoutes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/slot" element={<Slot />} />
            <Route path="/about" element={<About />} />
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/evolution" element={<EvolutionLive />} />
            <Route path="/evolution/live" element={<EvolutionLive />} />
            <Route path="/pragmatic" element={<PragmaticLive />} />
            <Route path="/pragmatic/live" element={<PragmaticLive />} />
            <Route path="/asiagaming" element={<AsiaGamingLive />} />
            <Route path="/asiagaming/live" element={<AsiaGamingLive />} />
            <Route path="/microgaming" element={<MicroGamingLive />} />
            <Route path="/microgaming/live" element={<MicroGamingLive />} />
            <Route path="/pragmatic/slot" element={<PragmaticSlot />} />
            <Route path="/asiagaming/slot" element={<AsiaGamingSlot />} />
            <Route path="/microgaming/slot" element={<MicroGamingSlot />} />
            <Route path="/bti" element={<Bti />} />
            <Route path="/gigx" element={<Gigx />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/wallet" element={<Wallet />} />
        </>
    );
};

export default contentRoutes;
