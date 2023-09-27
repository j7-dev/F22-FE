import evolutionProviderImg from '@/assets/images/game_provider/evo.png';
import pragmaticplayProviderImg from '@/assets/images/game_provider/pragmaticplay.png';
import microgamingProviderImg from '@/assets/images/game_provider/microgaming.png';
import asiagamingProviderImg from '@/assets/images/game_provider/asiagaming.png';
import btiProviderImg from '@/assets/images/game_provider/bti.png';
import gigxProviderImg from '@/assets/images/game_provider/igx.png';
import evolutionProviderImg2 from '@/assets/images/game_provider/evo2.png';
import pragmaticplayProviderImg2 from '@/assets/images/game_provider/pragmaticplay2.png';
import microgamingProviderImg2 from '@/assets/images/game_provider/microgaming2.png';
import asiagamingProviderImg2 from '@/assets/images/game_provider/asiagaming2.png';
import btiProviderImg2 from '@/assets/images/game_provider/bti2.png';
import gigxProviderImg2 from '@/assets/images/game_provider/igx2.png';
import pragmaticplayFavicon from '@/assets/images/game_provider/pragmaticplay_icon.png';
import evolutionFavicon from '@/assets/images/game_provider/evo_icon.png';
// import golfFavicon from '@/assets/images/golf_favicon.ico';
// import btiFavicon from '@/assets/images/bti_favicon.ico';
import mgFavicon from '@/assets/images/game_provider/microgaming_icon.png';
import agFavicon from '@/assets/images/game_provider/asiagaming_icon.png';

export const fakeProviderData = [
    {
        ProviderImg: btiProviderImg,
        ProviderImg2: btiProviderImg2,
        ProviderName: 'BTI',
        ProviderPath: '/bti',
        ProviderFavicon: btiProviderImg,
        ProviderType: ['Sports'],
    },
    {
        ProviderImg: gigxProviderImg,
        ProviderImg2: gigxProviderImg2,
        ProviderName: 'IGX Golf',
        ProviderPath: '/gigx',
        ProviderFavicon: gigxProviderImg,
        ProviderType: ['Sports'],
    },
    {
        ProviderImg: evolutionProviderImg,
        ProviderImg2: evolutionProviderImg2,
        ProviderName: 'Evolution',
        ProviderPath: '/evolution',
        ProviderFavicon: evolutionFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
    {
        ProviderImg: pragmaticplayProviderImg,
        ProviderImg2: pragmaticplayProviderImg2,
        ProviderName: 'Pragmatic Play',
        ProviderPath: '/pragmatic',
        ProviderFavicon: pragmaticplayFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
    {
        ProviderImg: microgamingProviderImg,
        ProviderImg2: microgamingProviderImg2,
        ProviderName: 'Micro Gaming',
        ProviderPath: '/microgaming',
        ProviderFavicon: mgFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
    {
        ProviderImg: asiagamingProviderImg,
        ProviderImg2: asiagamingProviderImg2,
        ProviderName: 'Asia Gaming',
        ProviderPath: '/asiagaming',
        ProviderFavicon: agFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
];
