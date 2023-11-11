import { TGameProvider } from '@/types/games';
import slogGameAgImg from '@/assets/images/game_provider/new_slog_ag.png';
import slogGameMgImg from '@/assets/images/game_provider/new_slog_mg.png';
import slogGamePpImg from '@/assets/images/game_provider/new_slog_pp.png';
import casinoGameEvoImg from '@/assets/images/game_provider/new_casino_evo.png';
import pragmaticplayProviderImg2 from '@/assets/images/game_provider/pragmaticplay2.png';
import microGamingProviderImg2 from '@/assets/images/game_provider/microgaming2.png';
import asiaGamingProviderImg2 from '@/assets/images/game_provider/asiagaming2.png';
import evolutionProviderImg2 from '@/assets/images/game_provider/evoIcon.svg';
import slot_all_icon from '@/assets/images/Icon_Menu_Filled_Slot.svg';
import mgWhiteIcon from '@/assets/images/game_provider/mgWhite.svg';
import agWhiteIcon from '@/assets/images/game_provider/agWhite.svg';
import evoWhiteIcon from '@/assets/images/game_provider/evoWhite.svg';
import ppWhiteIcon from '@/assets/images/game_provider/ppWhite.svg';
import ProviderS_PragmaticPlay from '@/assets/images/game_provider/ProviderS_PragmaticPlay.svg';
import ProviderS_AsiaGaming from '@/assets/images/game_provider/ProviderS_AsiaGaming.svg';
import ProviderS_Microgaming from '@/assets/images/game_provider/ProviderS_Microgaming.svg';
//TODO 有空把這邊的providerData跟HOME裡面的ProviderData整合
export const providerData: TGameProvider[] = [
    {
        label: 'Pragmatic Play',
        value: 'pragmaticPlay',
        gameCategories: ['slot', 'casino'],
        providerData: {
            providerMainImg: slogGamePpImg,
            providerSmallIcon: ProviderS_PragmaticPlay,
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
            providerMainImg: slogGameMgImg,
            providerSmallIcon: ProviderS_Microgaming,
            providerFavIcon: microGamingProviderImg2,
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
            providerMainImg: slogGameAgImg,
            providerSmallIcon: ProviderS_AsiaGaming,
            providerFavIcon: asiaGamingProviderImg2,
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
            providerDescribe: 'GAME SHOWS – REDEFINING YOUR LIVE CASINO Evolution has combined your favourite traditional table games and money wheel games with elements of world-famous game shows and board games for an immersive and totally involving gaming experience. Our Game Shows category delivers more entertainment, interaction and thrills to players than ever before with the addition of multipliers that add extra layers of excitement',
            providerPath: 'evolution',
        },
    },
];
