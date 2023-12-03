import React, { useState } from 'react';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import SingleModal from './Modal';

const index: React.FC = () => {
    const [openPopup, setOpenPopup] = useState(true);
    //彈窗
    const { data } = useGetMarketingContent({ position: 'MODAL' });

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
    //如果沒有資料，則不顯示
    if (!fxnData?.length) return <></>;
    //FIXME 還有更好的做法嗎?
    //把handleSetOpenPopup函數傳入SingleModal執行，每次執行都會+1，當等於fxnData?.length時，代表所有彈窗都關閉了，則把openPopup關閉
    let closePopup = 0;
    const handleSetOpenPopup = () => {
        closePopup++;
        if (closePopup === fxnData?.length) {
            setOpenPopup(false);
        }
    };
    return (
        <>
            <div className={`${openPopup ? 'flex' : 'hidden'} ModalMarketing justify-center gap-10 fixed left-0 top-0 z-50 w-screen h-screen p-10 bg-[#000000d9]`}>
                {fxnData?.map((item) => (
                    <SingleModal item={item} fun={handleSetOpenPopup} />
                ))}
            </div>
        </>
    );
};

export default index;
