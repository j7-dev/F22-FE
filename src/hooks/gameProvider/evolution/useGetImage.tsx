// import defaultImg from '@/assets/images/game_provider/evoIcon.svg';
/**
 * 動態引入evo圖片
 * 目錄為/assets/images/EVO_Thumbnails/${var}.png
 * @param {string} gameName 遊戲名稱
 * @returns 圖片路徑
 */
export const useGetImage = (gameName: string) => {
    //FIXME 這邊是判斷是否為開發模式，還可以怎麼優化？
    // const basePath = import.meta.env.MODE === 'development' ? 'src' : '';
    //將遊戲名稱轉換成小寫並且空格轉換成底線
    const gameNameLower = removeCharsAfterSpace(gameName).toLowerCase().replace(/\s/g, '_');
    //絕對路徑為當前網址的根目錄=>public/images/EVO_Thumbnails/${var}.png
    const imgObj = new URL(`/images/EVO_Thumbnails/${gameNameLower}.jpg`, window.location.origin);
    const imgPath = imgObj.pathname;
    return imgPath;
};

//判斷一個字串在空格之後是否有2個以內英文字符或是數字
const removeCharsAfterSpace = (inputString: string) => {
    const patternDNT = /\sDNT/; //匹配DNT
    const pattern = /\s\d{1,2}(?=[^\s]*$)/; //匹配2個以內數字
    //使用 trim() 方法来删除字符串两端的多余空格
    // console.log(inputString.replace(patternDNT, '').replace(pattern, '').trim());
    return inputString.replace(patternDNT, '').replace(pattern, '').trim();
};
//檢查是否有圖片
export const checkImage = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
            resolve(true); // 圖片存在
        };
        img.onerror = function () {
            resolve(false); // 圖片不存在
        };
        img.src = url;
    });
};
