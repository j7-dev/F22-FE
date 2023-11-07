import { TCasinoCategory } from '@/types/games';
import blackjackImg from '@/assets/images/casino/Icon_CasinoFilter_Blackjack.svg';
import rouletteImg from '@/assets/images/casino/Icon_CasinoFilter_Roulette.svg';
import baccaratImg from '@/assets/images/casino/Icon_CasinoFilter_Baccarat.svg';
import otherImg from '@/assets/images/casino/Icon_CasinoFilter_Other.svg';
import diceImg from '@/assets/images/casino/Icon_CasinoFilter_Dice.svg';
import blackjackImg2 from '@/assets/images/casino/Icon_CasinoFilter_Blackjack2.svg';
import rouletteImg2 from '@/assets/images/casino/Icon_CasinoFilter_Roulette2.svg';
import baccaratImg2 from '@/assets/images/casino/Icon_CasinoFilter_Baccarat2.svg';
import otherImg2 from '@/assets/images/casino/Icon_CasinoFilter_Other2.svg';
import diceImg2 from '@/assets/images/casino/Icon_CasinoFilter_Dice2.svg';
//TODO 之後有時間再把SVG轉成Component
//把遊戲商的遊戲類型轉換成五大分類方法
export const mappingCasinoCategory = ({ category }: { category: string }) => {
    if (casinoCategoryFilter.baccarat.includes(category)) return 'baccarat';
    if (casinoCategoryFilter.blackjack.includes(category)) return 'blackjack';
    if (casinoCategoryFilter.roulette.includes(category)) return 'roulette';
    if (casinoCategoryFilter.dice.includes(category)) return 'dice';
    if (casinoCategoryFilter.other.includes(category)) return 'other';
};
export const mappingCasinoCategoryIcon = ({ category }: { category: string }) => {
    if (casinoCategoryFilter.baccarat.includes(category)) return baccaratImg;
    if (casinoCategoryFilter.blackjack.includes(category)) return blackjackImg;
    if (casinoCategoryFilter.roulette.includes(category)) return rouletteImg;
    if (casinoCategoryFilter.dice.includes(category)) return diceImg;
    if (casinoCategoryFilter.other.includes(category)) return otherImg;
};

//記錄遊戲商的遊戲類型並且分類在五大類中
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
        img: baccaratImg,
        mbImg: baccaratImg2,
        name: 'Baccarat',
        Category: 'baccarat',
    },
    {
        img: blackjackImg,
        mbImg: blackjackImg2,
        name: 'Blackjack',
        Category: 'blackjack',
    },
    {
        img: rouletteImg,
        mbImg: rouletteImg2,
        name: 'Roulette',
        Category: 'roulette',
    },
    {
        img: diceImg,
        mbImg: diceImg2,
        name: 'Dice',
        Category: 'dice',
    },
    {
        img: otherImg,
        mbImg: otherImg2,
        name: 'Other',
        Category: 'other',
    },
];
