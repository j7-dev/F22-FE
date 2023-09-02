import evolutionProviderImg from '@/assets/images/evolutionProviderImg.svg';
import pragmaticplayProviderImg from '@/assets/images/pragmaticplayProviderImg.png';
import microgamingProviderImg from '@/assets/images/microgamingProviderImg.png';
import asiagamingProviderImg from '@/assets/images/asiagamingProviderImg.png';
import btiProviderImg from '@/assets/images/btiProviderImg.png';
import gigxProviderImg from '@/assets/images/gigxProviderImg.png';
import pragmaticplayFavicon from '@/assets/images/pragmaticplay_favicon.ico';
import evolutionFavicon from '@/assets/images/evolution_favicon.png';
// import golfFavicon from '@/assets/images/golf_favicon.ico';
// import btiFavicon from '@/assets/images/bti_favicon.ico';
import mgFavicon from '@/assets/images/mg_favicon.png';
import agFavicon from '@/assets/images/ag_favicon.png';

export const fakeProviderData = [
    {
        ProviderImg: btiProviderImg,
        ProviderName: 'BTI',
        ProviderPath: '/bti',
        ProviderFavicon: btiProviderImg,
        ProviderType: ['Sports'],
    },
    {
        ProviderImg: gigxProviderImg,
        ProviderName: 'IGX Golf',
        ProviderPath: '/gigx',
        ProviderFavicon: gigxProviderImg,
        ProviderType: ['Sports'],
    },
    {
        ProviderImg: evolutionProviderImg,
        ProviderName: 'Evolution',
        ProviderPath: '/evolution',
        ProviderFavicon: evolutionFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
    {
        ProviderImg: pragmaticplayProviderImg,
        ProviderName: 'Pragmatic Play',
        ProviderPath: '/pragmatic',
        ProviderFavicon: pragmaticplayFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
    {
        ProviderImg: microgamingProviderImg,
        ProviderName: 'Micro Gaming',
        ProviderPath: '/microgaming',
        ProviderFavicon: mgFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
    {
        ProviderImg: asiagamingProviderImg,
        ProviderName: 'Asia Gaming',
        ProviderPath: '/softgamings',
        ProviderFavicon: agFavicon,
        ProviderType: ['Live Casino', 'Slot Game'],
    },
];
