import { useList } from '@refinedev/core';
import { getGameTypeImg } from '@/components/ContentLayout/Games/Game/GameImg';
import { TPopularGame } from '@/types/resources/popularGames';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
// import { GameCategoryData } from '@/utils/GameCategory';

// 生成隨機的6個索引
const getRandomIndexes = (arr: TPopularGame[], count: number) => {
    const indexes = [];
    const arrLength = arr.length;

    // 使用 Fisher-Yates 算法
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * (arrLength - i));
        indexes.push(randomIndex);
        // 将已选中的索引交换到数组末尾，以避免重复选择
        [arr[randomIndex], arr[arrLength - 1 - i]] = [arr[arrLength - 1 - i], arr[randomIndex]];
    }
    return indexes;
};

export const useGetPopularGames = () => {
    //取得evo遊戲資料
    const { data: evoData, isLoading: evoLoading } = useList({
        resource: 'evo/tablelist',
    });
    //取得pp遊戲資料
    const { data: ppData, isLoading: ppLoading } = useGetPPTableList();

    //重組Slot Games遊戲資料
    const slotGames = ppData?.slice(0, 6).map((item: TPopularGame) => {
        return {
            gameID: item.gameID,
            gameImg: item.gameImg,
        };
    });

    //重組Live Casino遊戲資料
    const liveGamesData = evoData?.data.slice(0, 6).map((item) => {
        return {
            gameID: item['Table ID'],
            gameImg: getGameTypeImg(item['Game Type']),
        };
    }) as TPopularGame[];

    //重組所有遊戲資料
    const allGamesArray = liveGamesData && slotGames ? [...liveGamesData, ...slotGames] : ([] as TPopularGame[]);
    // 獲取隨機的6個元素
    //TODO 有個BUG，切換語言時會多一個遊戲=>觸發重新渲染時會多一個?
    const randomIndexes = getRandomIndexes(allGamesArray, 6);
    const sixPoplarAllGames = randomIndexes.map((index) => allGamesArray[index]);

    const PopularGamesData = [
        {
            label: 'All Games',
            value: 'allGames',
            gameData: sixPoplarAllGames, //隨機取得所有遊戲中的6個
        },
        {
            label: 'In Play',
            value: 'inPlay',
            gameData: [],
        },
        {
            label: 'Sports',
            value: 'sports',
            gameData: [],
        },
        {
            label: 'Golf',
            value: 'golf',
            gameData: [],
        },
        {
            label: 'Casino',
            value: 'casino',
            gameData: liveGamesData,
        },
        {
            label: 'Slot',
            value: 'slot',
            gameData: slotGames,
        },
        {
            label: 'Games',
            value: 'games',
            gameData: [],
        },
    ];
    const loading = !(evoLoading || ppLoading);
    return { PopularGamesData, loading };
};
