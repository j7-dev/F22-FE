import evolutionProviderImg from '@/assets/images/game_provider/evo.png';
import pragmaticplayProviderImg from '@/assets/images/game_provider/pragmaticplay.png';
import microgamingProviderImg from '@/assets/images/game_provider/microgaming.png';
import asiagamingProviderImg from '@/assets/images/game_provider/asiagaming.png';
import btiProviderImg from '@/assets/images/game_provider/bti.png';
import gigxProviderImg from '@/assets/images/game_provider/igx.png';
import pragmaticplayFavicon from '@/assets/images/game_provider/pragmaticplay_icon.png';
import evolutionFavicon from '@/assets/images/game_provider/evo_icon.png';
// import golfFavicon from '@/assets/images/golf_favicon.ico';
// import btiFavicon from '@/assets/images/bti_favicon.ico';
import mgFavicon from '@/assets/images/game_provider/microgaming_icon.png';
import agFavicon from '@/assets/images/game_provider/asiagaming_icon.png';

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
