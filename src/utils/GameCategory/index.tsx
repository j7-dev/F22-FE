import { TGameCategory } from '@/types/resources/gameCategory';

// 用來判斷此遊戲是歸類到七大分類哪個分類
export const mappingGameCategory = ({ gameProviderName, _gameProviderCategory }: { gameProviderName: string; _gameProviderCategory?: string }) => {
    if (gameProviderName === 'EVO') return 'casino';
    if (gameProviderName === 'PP') return 'slot';
    return 'events';
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
