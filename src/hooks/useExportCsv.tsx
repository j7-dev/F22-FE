import { mkConfig, generateCsv, download } from 'export-to-csv';
import { checkImage } from '@/hooks/gameProvider/evolution/useGetImage';
import { TGame } from '@/types/games';
/**
 * 匯出CSV函數封裝簡易版
 * @param {TGame[]} gameData 遊戲資料
 * @returns {void} 執行匯出動作,無返回值
 */
export const useExportCsv = () => {
    //執行匯出CSV
    const handleDownload =
        ({ gameData }: { gameData: TGame[] }) =>
        async () => {
            const patternDNT = /\sDNT/; //匹配DNT
            const pattern = /\s\d{1,2}(?=[^\s]*$)/; //匹配2個以內數字
            const csvConfig = mkConfig({ useKeysAsHeaders: true });
            //等待所有Promise執行完畢
            const newGameData = await Promise.all(
                gameData.map(async (item) => {
                    const hasImg = await checkImage(item.gameImg as string);
                    return {
                        遊戲名稱: item['Table Name'],
                        轉換名稱: item['Table Name']?.replace(patternDNT, '').replace(pattern, '').trim().toLowerCase().replace(/\s/g, '_'),
                        遊戲圖片: item.gameImg,
                        是否存在圖片: hasImg ? '圖片存在' : '圖片不存在',
                    };
                }),
            );
            const csv = generateCsv(csvConfig)(newGameData);
            download(csvConfig)(csv);
        };
    return { handleDownload };
};
