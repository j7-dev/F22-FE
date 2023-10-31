import { TGame } from '@/types/games';

export const getRandomIndexes = (arr: TGame[], count: number) => {
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
