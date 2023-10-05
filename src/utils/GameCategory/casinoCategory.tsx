import { TCasinoCategory } from '@/types/games';
import allImg from '@/assets/images/casino/Icon_CasinoFilter_All.svg';
import blackjackImg from '@/assets/images/casino/Icon_CasinoFilter_Blackjack.svg';
import rouletteImg from '@/assets/images/casino/Icon_CasinoFilter_Roulette.svg';
import baccaratImg from '@/assets/images/casino/Icon_CasinoFilter_Baccarat.svg';
import otherImg from '@/assets/images/casino/Icon_CasinoFilter_Other.svg';
import diceImg from '@/assets/images/casino/Icon_CasinoFilter_Dice.svg';

//篩選Casino Provider API來的遊戲類型轉換成五大分類
export const casinoCategoryFilter: TCasinoCategory = {
    baccarat: ['baccarat', 'Baccarat', 'Baccarat New'],
    blackjack: ['blackjack', 'lightningscalablebj', 'scalableblackjack', 'powerscalableblackjack', 'Blackjack'],
    roulette: ['roulette', 'americanroulette', 'Roulette'],
    dice: ['sicbo', 'craps'],
    other: ['dhp', 'dragontiger', 'cashorcrash', 'videopoker', 'holdem', 'powerball', 'monopoly', 'funkytime', 'andarbahar', 'moneywheel', 'gonzotreasuremap', 'crazytime', 'teenpatti', 'monopolybigballer', 'bacbo', 'sidebetcity', 'trp', 'csp', 'instantroulette', 'dealnodeal', 'megaball', 'lightningdice', 'gonzotreasurehunt', 'thb', 'topdice', 'classicfreebet', 'eth', 'deadoralivesaloon', 'crazycoinflip', 'lightninglotto', 'topcard', 'extrachilliepicspins', 'fantan', 'freebet'],
};

//Casino 五大分類
export const casinoCategory = [
    {
        img: allImg,
        name: 'All',
        Category: 'all',
    },
    {
        img: baccaratImg,
        name: 'Baccarat',
        Category: 'baccarat',
    },
    {
        img: blackjackImg,
        name: 'Blackjack',
        Category: 'blackjack',
    },
    {
        img: rouletteImg,
        name: 'Roulette',
        Category: 'roulette',
    },
    {
        img: diceImg,
        name: 'Dice',
        Category: 'dice',
    },
    {
        img: otherImg,
        name: 'Other',
        Category: 'other',
    },
];
