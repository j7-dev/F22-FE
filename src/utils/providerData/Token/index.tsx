import { TGame } from '@/types/games';
// import evoIcon from '@/assets/images/game_provider/evo_icon.png';
// import ppIcon from '@/assets/images/game_provider/ppIcon.svg';
import casinoIcon from '@/assets/images/Icon_Menu_Outlined_Casino.svg';
import slotIcon from '@/assets/images/Icon_Menu_Outlined_Slot.svg';
import gamesIcon from '@/assets/images/Icon_Menu_Outlined_Games.svg';
import cq9 from '@/assets/images/game_provider/cq9.jpg';
import wm from '@/assets/images/game_provider/wm.jpg';
import aecasino from '@/assets/images/game_provider/aecasino.jpg';
import agcasino from '@/assets/images/game_provider/agcasino.jpg';
import mglive from '@/assets/images/game_provider/mglive.jpg';

// 排除 Token 的 EVO & PP

export const tokenData: TGame[] = [
    {
        gameName: '룰렛',
        gtype: 'roulette',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '하이로우',
        gtype: 'hilo',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '하이로우5초',
        gtype: 'hilo_5s',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '그래프',
        gtype: 'graph',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰바카라',
        gtype: 'baccarat',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '가상경마',
        gtype: 'horse',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰휠',
        gtype: 'fw',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰 달팽이레이싱',
        gtype: 'snail3 / snail4',
        openFn: 'iframe',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰 카지노',
        gtype: 'tokencasino',
        openFn: 'iframe',
        gameImg: casinoIcon,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰슬롯',
        gtype: 'slot',
        openFn: 'blank',
        gameImg: slotIcon,
        gameCategory: 'slot',
        gameProviderName: 'token',
    },
    {
        gameName: '가상스포츠',
        gtype: 'vsports',
        openFn: 'blank',
        gameImg: gamesIcon,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    // {
    //     gameName: '에볼루션',
    //     gtype: 'evolution',
    //     openFn: 'blank',
    //     gameImg: evoIcon,
    //     gameCategory: 'casino',
    //     gameProviderName: 'token',
    // },
    {
        gameName: '섹시게이밍',
        gtype: 'aecasino',
        openFn: 'blank',
        gameImg: aecasino,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    // {
    //     gameName: '프래그마틱 플레이',
    //     gtype: 'pp',
    //     openFn: 'blank',
    //     gameImg: ppIcon,
    //     gameCategory: 'slot',
    //     gameProviderName: 'token',
    // },
    {
        gameName: 'CQ9',
        gtype: 'cq9',
        openFn: 'blank',
        gameImg: cq9,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '플레이텍',
        gtype: 'pt',
        openFn: 'blank',
        gameImg: casinoIcon,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '마이크로게이밍',
        gtype: 'mglive',
        openFn: 'blank',
        gameImg: mglive,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '오리엔탈 게이밍',
        gtype: 'og',
        openFn: 'blank',
        gameImg: casinoIcon,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '올뱃',
        gtype: 'allbet',
        openFn: 'blank',
        gameImg: casinoIcon,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: 'WM카지노',
        gtype: 'wm',
        openFn: 'blank',
        gameImg: wm,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '아시아게이밍',
        gtype: 'agcasino',
        openFn: 'blank',
        gameImg: agcasino,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
];
