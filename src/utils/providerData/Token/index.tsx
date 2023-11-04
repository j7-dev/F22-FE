import { TGame } from '@/types/games';
import cq9 from '@/assets/images/game_provider/cq9.jpg';
import wm from '@/assets/images/game_provider/wm.jpg';
import aecasino from '@/assets/images/game_provider/aecasino.jpg';
import agcasino from '@/assets/images/game_provider/agcasino.jpg';
import mglive from '@/assets/images/game_provider/mglive.jpg';
import roulette from '@/assets/images/game_provider/roulette.jpeg';
import hilo from '@/assets/images/game_provider/hilo.jpeg';
import hilo5s from '@/assets/images/game_provider/hilo5s.jpeg';
import graph from '@/assets/images/game_provider/graph.jpeg';
import baccarat from '@/assets/images/game_provider/baccarat.jpeg';
import horse from '@/assets/images/game_provider/horse.jpeg';
import fw from '@/assets/images/game_provider/fw.jpeg';
import allbet from '@/assets/images/game_provider/allbet.png';
import og from '@/assets/images/game_provider/og.png';
import pt from '@/assets/images/game_provider/pt.png';
// import snail from '@/assets/images/game_provider/snail.jpg';
import slot from '@/assets/images/game_provider/slot.jpg';
import vsport from '@/assets/images/game_provider/vsport.jpeg';

// 排除 Token 的 EVO & PP

export const tokenData: TGame[] = [
    {
        gameName: '룰렛',
        gameID: '룰렛',
        gtype: 'roulette',
        openFn: 'iframe',
        gameImg: roulette,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '하이로우',
        gameID: '하이로우',
        gtype: 'hilo',
        openFn: 'iframe',
        gameImg: hilo,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '하이로우5초',
        gameID: '하이로우5초',
        gtype: 'hilo_5s',
        openFn: 'iframe',
        gameImg: hilo5s,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '그래프',
        gameID: '그래프',
        gtype: 'graph',
        openFn: 'iframe',
        gameImg: graph,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰바카라',
        gameID: '토큰바카라',
        gtype: 'baccarat',
        openFn: 'iframe',
        gameImg: baccarat,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '가상경마',
        gameID: '가상경마',
        gtype: 'horse',
        openFn: 'iframe',
        gameImg: horse,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    {
        gameName: '토큰휠',
        gameID: '토큰휠',
        gtype: 'fw',
        openFn: 'iframe',
        gameImg: fw,
        gameCategory: 'games',
        gameProviderName: 'token',
    },
    // { // 因為打不開，所以先隱藏
    //     gameName: '토큰 달팽이레이싱',
    //     gtype: 'snail3 / snail4',
    //     openFn: 'iframe',
    //     gameImg: snail,
    //     gameCategory: 'games',
    //     gameProviderName: 'token',
    // },
    // { //未上市 不用接
    //     gameName: '토큰 카지노',
    //     gtype: 'tokencasino',
    //     openFn: 'iframe',
    //     gameImg: casinoIcon,
    //     gameCategory: 'casino',
    //     gameProviderName: 'token',
    // },
    {
        gameName: '토큰슬롯',
        gameID: '토큰슬롯',
        gtype: 'slot',
        openFn: 'blank',
        gameImg: slot,
        gameCategory: 'slot',
        gameProviderName: 'token',
    },
    {
        gameName: '가상스포츠',
        gameID: '가상스포츠',
        gtype: 'vsports',
        openFn: 'blank',
        gameImg: vsport,
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
        gameID: '섹시게이밍',
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
        gameID: 'CQ9',
        gtype: 'cq9',
        openFn: 'blank',
        gameImg: cq9,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '플레이텍',
        gameID: '플레이텍',
        gtype: 'pt',
        openFn: 'blank',
        gameImg: pt,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '마이크로게이밍',
        gameID: '마이크로게이밍',
        gtype: 'mglive',
        openFn: 'blank',
        gameImg: mglive,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '오리엔탈 게이밍',
        gameID: '오리엔탈 게이밍',
        gtype: 'og',
        openFn: 'blank',
        gameImg: og,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '올뱃',
        gameID: '올뱃',
        gtype: 'allbet',
        openFn: 'blank',
        gameImg: allbet,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: 'WM카지노',
        gameID: 'WM카지노',
        gtype: 'wm',
        openFn: 'blank',
        gameImg: wm,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
    {
        gameName: '아시아게이밍',
        gameID: '아시아게이밍',
        gtype: 'agcasino',
        openFn: 'blank',
        gameImg: agcasino,
        gameCategory: 'casino',
        gameProviderName: 'token',
    },
];
