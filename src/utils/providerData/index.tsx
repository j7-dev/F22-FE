import { TGameProvider } from '@/types/games';
import sloggameAgImg from '@/assets/images/sloggame_ag.jpg';
import sloggameMgImg from '@/assets/images/sloggame_mg.jpg';
import sloggamePpImg from '@/assets/images/sloggame_pp.jpg';
import pragmaticplayProviderImg2 from '@/assets/images/game_provider/pragmaticplay2.png';
import microgamingProviderImg2 from '@/assets/images/game_provider/microgaming2.png';
import asiagamingProviderImg2 from '@/assets/images/game_provider/asiagaming2.png';

export const providerData: TGameProvider[] = [
    {
        label: 'Pragmatic Play',
        value: 'pragmaticPlay',
        gameCategories: ['slot'],
        providerData: {
            providerMainImg: sloggamePpImg,
            providerSmallImg: sloggamePpImg,
            providerFavIcon: pragmaticplayProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: '/pragmatic',
        },
    },
    {
        label: 'Micro Gaming',
        value: 'microGaming',
        gameCategories: ['slot'],
        providerData: {
            providerMainImg: sloggameMgImg,
            providerSmallImg: sloggameMgImg,
            providerFavIcon: microgamingProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
        },
    },
    {
        label: 'Asia Gaming',
        value: 'asiaGaming',
        gameCategories: ['slot'],
        providerData: {
            providerMainImg: sloggameAgImg,
            providerSmallImg: sloggameAgImg,
            providerFavIcon: asiagamingProviderImg2,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: '/asiagaming',
        },
    },
];
