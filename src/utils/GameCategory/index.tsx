import { TGameCategory } from '@/types/games/gameCategory';
import { TGameProvider } from '@/types/games';

// 用來判斷此遊戲是歸類到七大分類哪個分類
export const mappingGameCategory = ({ gameProviderName, _gameProviderCategory }: { gameProviderName: string; _gameProviderCategory?: string }) => {
    if (gameProviderName === 'evolution') return 'casino';
    if (gameProviderName === 'pragmaticPlay') return 'slot';
    return 'events';
};
//用此來判斷此遊戲廠商是否有包含此分類
export const mappingIncludesProvider = ({ providerData, category }: { providerData: TGameProvider[]; category: TGameCategory }) => {
    return providerData.filter((providerItem) => providerItem.gameCategories.includes(category.value));
};
export const gameCategories: TGameCategory[] = [
    {
        label: 'In Play',
        value: 'inPlay',
        path: 'inPlay',
    },
    {
        label: 'Sports',
        value: 'sports',
        path: 'sports',
    },
    {
        label: 'Golf',
        value: 'golf',
        path: 'golf',
    },
    {
        label: 'Casino',
        value: 'casino',
        path: 'casino',
    },
    {
        label: 'Slot',
        value: 'slot',
        path: 'slot',
    },
    {
        label: 'Games',
        value: 'games',
        path: 'games',
    },
    {
        label: 'Events',
        value: 'events',
        path: 'events',
    },
];
