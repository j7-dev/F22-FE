//1.判斷遊戲類型=>指定要顯示哪一個類型圖片的函式
//2.返回遊戲類型函數返回的圖片路徑
import { baccaratImg } from './baccarat';
import { blackjackImg } from './blackjack';
import { rouletteImg } from './roulette';
import { otherGameImg } from './otherGame';
import { diceImg } from './dice';

type TgameType = {
    [key: string]: string[];
};

//篩選API來的遊戲類型轉換成五大分類
export const gameTypeFilter: TgameType = {
    Baccarat: ['baccarat'],
    Blackjack: ['blackjack', 'lightningscalablebj', 'scalableblackjack', 'powerscalableblackjack'],
    Roulette: ['roulette', 'americanroulette'],
    Dice: ['sicbo', 'craps'],
    Other: ['dhp', 'dragontiger', 'cashorcrash', 'videopoker', 'holdem', 'powerball', 'monopoly', 'funkytime', 'andarbahar', 'moneywheel', 'gonzotreasuremap', 'crazytime', 'teenpatti', 'monopolybigballer', 'bacbo', 'sidebetcity', 'trp', 'csp', 'instantroulette', 'dealnodeal', 'megaball', 'lightningdice', 'gonzotreasurehunt', 'thb', 'topdice', 'classicfreebet', 'eth', 'deadoralivesaloon', 'crazycoinflip', 'lightninglotto', 'topcard', 'extrachilliepicspins', 'fantan', 'freebet'],
};
//各類型圖片的索引值
const IndexArray = {
    Baccarat: 0,
    Blackjack: 0,
    Roulette: 0,
    Dice: 0,
    Other: 0,
};
//各類型圖片的路徑
const imageArray = {
    Baccarat: baccaratImg,
    Blackjack: blackjackImg,
    Roulette: rouletteImg,
    Dice: diceImg,
    Other: otherGameImg,
};
//根據遊戲類型返回圖片路徑
export const getGameTypeImg = (gameType: string) => {
    // console.log('gameType', gameType);
    // 使用 Object.keys 获取所有游戏类型的 key 数组
    const gameTypeKeys = Object.keys(gameTypeFilter);
    // 使用 Array.find 查找匹配的 key
    const matchingKey = gameTypeKeys.find((key) => gameTypeFilter[key].includes(gameType.toLowerCase()));
    // console.log('matchingKey', matchingKey);
    switch (matchingKey) {
        case 'Baccarat': {
            const currentIndex = IndexArray[matchingKey];
            IndexArray[matchingKey]++;
            return imageArray[matchingKey][currentIndex % imageArray[matchingKey].length];
        }
        case 'Blackjack': {
            const currentIndex = IndexArray[matchingKey];
            IndexArray[matchingKey]++;
            return imageArray[matchingKey][currentIndex % imageArray[matchingKey].length];
        }
        case 'Roulette': {
            const currentIndex = IndexArray[matchingKey];
            IndexArray[matchingKey]++;
            return imageArray[matchingKey][currentIndex % imageArray[matchingKey].length];
        }
        case 'Dice': {
            const currentIndex = IndexArray[matchingKey];
            IndexArray[matchingKey]++;
            return imageArray[matchingKey][currentIndex % imageArray[matchingKey].length];
        }
        case 'Other': {
            const currentIndex = IndexArray[matchingKey];
            IndexArray[matchingKey]++;
            return imageArray[matchingKey][currentIndex % imageArray[matchingKey].length];
        }
        default:
            return '';
    }
};
