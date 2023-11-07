import { TGameProvider } from '@/types/games';
import sloggameAgImg from '@/assets/images/game_provider/new_slog_ag.png';
import sloggameMgImg from '@/assets/images/game_provider/new_slog_mg.png';
import sloggamePpImg from '@/assets/images/game_provider/new_slog_pp.png';
import casinoGameEvoImg from '@/assets/images/game_provider/new_casino_evo.png';
import pragmaticplayProviderImg2 from '@/assets/images/game_provider/pragmaticplay2.png';
import microgamingProviderImg2 from '@/assets/images/game_provider/microgaming2.png';
import asiagamingProviderImg2 from '@/assets/images/game_provider/asiagaming2.png';
import evolutionProviderImg2 from '@/assets/images/game_provider/evoIcon.svg';
import slot_all_icon from '@/assets/images/game_provider/slot_all_icon.svg';
import mgWhiteIcon from '@/assets/images/game_provider/mgWhite.svg';
import agWhiteIcon from '@/assets/images/game_provider/agWhite.svg';
import evoWhiteIcon from '@/assets/images/game_provider/evoWhite.svg';
import ppWhiteIcon from '@/assets/images/game_provider/ppWhite.svg';
// import ppProviderSmallIcon from '@/assets/images/game_provider/ppProviderSmallIcon.svg';
// import mgProviderSmallIcon from '@/assets/images/game_provider/mgProviderSmallIcon.svg';
// import agProviderSmallIcon from '@/assets/images/game_provider/agProviderSmallIcon.svg';

export const providerData: TGameProvider[] = [
    {
        label: 'Pragmatic Play',
        value: 'pragmaticPlay',
        gameCategories: ['slot', 'casino'],
        providerData: {
            providerMainImg: sloggamePpImg,
            providerSmallIcon: slot_all_icon,
            providerFavIcon: pragmaticplayProviderImg2,
            providerWhiteIcon: ppWhiteIcon,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: 'pragmaticPlay',
        },
    },
    {
        label: 'Micro Gaming',
        value: 'microGaming',
        gameCategories: ['slot'],
        providerData: {
            providerMainImg: sloggameMgImg,
            providerSmallIcon: slot_all_icon,
            providerFavIcon: microgamingProviderImg2,
            providerWhiteIcon: mgWhiteIcon,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: 'microGaming',
        },
    },
    {
        label: 'Asia Gaming',
        value: 'asiaGaming',
        gameCategories: ['slot'],
        providerData: {
            providerMainImg: sloggameAgImg,
            providerSmallIcon: slot_all_icon,
            providerFavIcon: asiagamingProviderImg2,
            providerWhiteIcon: agWhiteIcon,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: 'asiaGaming',
        },
    },
    {
        label: 'Evolution',
        value: 'evolution',
        gameCategories: ['casino'],
        providerData: {
            providerMainImg: casinoGameEvoImg,
            providerSmallIcon: slot_all_icon,
            providerFavIcon: evolutionProviderImg2,
            providerWhiteIcon: evoWhiteIcon,
            providerDescribe: 'Lorem ipsum dolor sit amet consectetur. Auctor interdum platea nibh ornare ac. Est sit elit viverra scelerisque venenatis.',
            providerPath: 'evolution',
        },
    },
];
