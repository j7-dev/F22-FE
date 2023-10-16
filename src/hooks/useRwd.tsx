import { useState, useEffect } from 'react';
import { throttle } from 'lodash-es';
/**
 * 判斷是否要呈現 PC 版面
 * @returns {boolean} 是否要呈現 PC 版面
 */

export const useRwd = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        // 监听窗口大小变化
        // console.log('windowWidth', windowWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', throttle(handleResize, 500));
        // 清理监听器以避免内存泄漏
        return () => {
            window.removeEventListener('resize', throttle(handleResize, 500));
        };
    }, [windowWidth]);

    return {
        windowWidth,
        isXl: windowWidth > 1200,
        isLg: windowWidth > 992,
        isMd: windowWidth > 768,
        isSm: windowWidth > 414,
        isXs: windowWidth > 0 && windowWidth < 414,
    };
};
