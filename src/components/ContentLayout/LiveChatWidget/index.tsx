/**
 * 自己另外封裝的 LiveChatWidget
 * 目的是為了讓 LiveChatWidget 在 5 秒後才顯示並且不影響其他組件render
 */

import { useState, useEffect } from 'react';
import { LiveChatWidget } from '@livechat/widget-react';
const index = () => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    if (showComponent) {
        return <LiveChatWidget license="16519437" visibility="minimized" />;
    }
    return <></>;
};

export default index;
