import React, { useState, useEffect } from 'react';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import SingleModal from './Modal';

const index: React.FC = () => {
    //彈窗
    const { data, isLoading } = useGetMarketingContent({ position: 'MODAL' });
    // 從 localStorage 中讀取存儲的數據
    const fxnData = data?.filter((item) => {
        const reminderData = localStorage.getItem(`${item.id}_reminderData`) || 0;
        // 檢查是否超過有效期（這裡假設有效期為一天）
        const expirationTime = 24 * 60 * 60 * 1000; // 一天的毫秒數
        const currentTime = new Date().getTime();
        if (currentTime - Number(reminderData) < expirationTime) {
            // 未超過有效期，不出現彈窗
            return false;
        }
        // 超過有效期或是首次出現，則出現彈窗
        return true;
    });
    //首次出現彈窗的彈窗數
    const [firstPopup, setFirstPopup] = useState(0);
    //關閉彈窗的次數
    const [closePopup, setClosePopup] = useState(0);
    const handleSetOpenPopup = () => {
        setClosePopup(closePopup + 1);
    };
    useEffect(() => {
        if (fxnData?.length) setFirstPopup(fxnData?.length);
    }, [isLoading]);
    //如果沒有資料或是關閉彈出的次數等於顯示的彈窗數，則不顯示
    if (!fxnData?.length || (closePopup == firstPopup && firstPopup !== 0)) return <></>;

    return (
        <>
            <div className={` ModalMarketing flex justify-center gap-10 fixed left-0 top-0 z-50 w-screen h-screen p-10 bg-[#000000d9]`}>
                {fxnData?.map((item) => (
                    <SingleModal item={item} fun={handleSetOpenPopup} />
                ))}
            </div>
        </>
    );
};

export default index;
