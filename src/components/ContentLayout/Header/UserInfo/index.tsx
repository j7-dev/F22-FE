import React from 'react';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
// import { useUserAPI } from '@/hooks/useUserAPI';
import { selectedSectionAtom } from '@/pages/Content/Wallet';
import { useGetIdentity } from '@refinedev/core';
import { TUser } from '@/types';
import { useGetNoteBox } from '@/hooks/resources/useGetNoteBox';
import noteBoxIcon from '@/assets/images/topBar/Icon_TopBar_NoteBox.svg';

const index: React.FC = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetIdentity<TUser>();
    const setSelectedSection = useSetAtom(selectedSectionAtom);
    const userName = data?.username || 'userName';
    const vip = data?.vip?.label || '';
    const { dataCount } = useGetNoteBox();
    const handleClckToSiteNotify = () => {
        setSelectedSection('siteNotify');
        navigate('/wallet');
    };

    const notifyCount = dataCount || 0;
    if (isLoading) return <div>loading...</div>;
    // console.log('notifyCount', notifyCount);
    return (
        <div className="userInfo w-full flex justify-end text-base leading-4 font-bold gap-2.5">
            <div className="userName flex flex-col justify-center items-end">
                <span className="userVip text-[#828282] ">{vip && vip}</span>
                <span className=" text-[#5932EA] whitespace-nowrap ">{userName}</span>
            </div>
            <div onClick={handleClckToSiteNotify} className="h-10 gap-2.5 relative rounded-lg flex justify-between items-center px-2 hover:bg-[#F3F3F4] cursor-pointer">
                <img src={noteBoxIcon} alt="" className="w-10" />
                {/* <BiMailSend color="#828282" size={40} /> */}
                <div className="rewardNumber absolute right-0 top-0 origin-center flex justify-center items-center min-w-[15px] min-h- bg-[#DC3545] px-1.5 aspect-square rounded-full text-xs font-bold text-white">{notifyCount}</div>
            </div>
        </div>
    );
};

export default index;
