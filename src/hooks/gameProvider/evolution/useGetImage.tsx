/**
 * 動態引入evo圖片
 * 目錄為/assets/images/EVO_Thumbnails/${var}.png
 * @param {string} gameName 遊戲名稱
 * @returns 圖片路徑
 */
export const useGetImage = (gameName: string) => {
    //FIXME 這邊是判斷是否為開發模式，還可以怎麼優化？
    const basePath = import.meta.env.MODE === 'development' ? 'src' : '';
    //將遊戲名稱轉換成小寫並且空格轉換成底線
    const gameNameLower = removeCharsAfterSpace(gameName).toLowerCase().replace(/\s/g, '_');
    //絕對路徑為當前網址的根目錄
    const imgObj = new URL(`${basePath}/assets/images/EVO_Thumbnails/${gameNameLower}.png`, window.location.origin);
    const imgPath = imgObj.pathname;
    return imgPath;
};

//判斷一個字串在空格之後是否有1個英文字符或是2個以內的數字
const removeCharsAfterSpace = (inputString: string) => {
    /**
     * \s[0-9]{1,2}$ 匹配一个空格后面跟着1到2个数字的模式。
     * [a-zA-Z]{1}$ 匹配一个单个英文字母的模式。
     * \s*，表示匹配零个或多个空格
     */
    const pattern = /\s[0-9]{1,2}$|[a-zA-Z]{1}\s*$/;
    //使用 trim() 方法来删除字符串两端的多余空格
    return inputString.replace(pattern, '').trim();
};
