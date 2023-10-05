import { TGameCategory, TGameProvider } from '@/types/games';

// 用來判斷此遊戲是歸類到七大分類哪個分類
export const mappingGameCategory = ({ gameProviderName, _gameProviderCategory }: { gameProviderName: string; _gameProviderCategory?: string }) => {
    if (gameProviderName === 'EVO') return 'casino';
    if (gameProviderName === 'PP') return 'slot';
    return 'events';
};
export const mappingIncludesProvider = ({ providerData, category }: { providerData: TGameProvider[]; category: TGameCategory }) => {
    return providerData.filter((providerItem) => providerItem.gameCategories.includes(category.value));
};
export const gameCategories: TGameCategory[] = [
    {
        label: 'In Play',
        value: 'inPlay',
        path: '/',
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
