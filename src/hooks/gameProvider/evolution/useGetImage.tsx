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
    /**
     * \s\b[a-zA-Z]{1,2}\b 匹配2個以內英文字符的模式。
     * \s\b\d{1,2}\b 匹配2個以內數字的模式。
     * $ 匹配字串結尾
     */
    // const pattern =  /\s\b[a-zA-Z]\b|\s\b\d{1,2}\b/;
    const pattern = /\s\b\d{1,2}\b:$/;
    // console.log(inputString.replace(pattern, ''));
    //使用 trim() 方法来删除字符串两端的多余空格
    return inputString.replace(pattern, '').trim();
};

//判斷路徑是否具有圖片檔案
// const isImageExist = (url: string, callback: (arg: boolean) => void) => {
//     const img = new Image();
//     img.src = url;
//     img.onload = function () {
//         callback(true);
//     };
//     img.onerror = function () {
//         callback(false);
//     };
// };
