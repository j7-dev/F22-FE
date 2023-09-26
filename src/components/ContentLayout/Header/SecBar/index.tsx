import React from 'react';
import { useSetAtom } from 'jotai';
import { popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';

const Secbar: React.FC = () => {
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
    // const popupIsOpen = useAtomValue(popupIsOpenAtom);
    const handleClick = () => {
        setPopupIsOpen((prevValue) => !prevValue);
        // console.log('popupIsOpenAtom', popupIsOpen);
    };
    return (
        <>
            {/* <!-- Secbar --> */}
            <div className="bg-[#2B3240] w-full px-4 sm:px-6 lg:px-8">
                <div className=" py-1 max-w-7xl mx-auto flex items-center justify-between gap-x-5 w-full">
                    <div className="font-bold text-white gap-x-2 flex">
                        <span>2029.12.12</span>
                        <span>test newsname</span>
                    </div>
                    <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-start md:gap-y-0 md:gap-x-7 md:mt-0 ">
                        <span className="font-bold text-white md:py-1 hover:text-[#78D39D] " onClick={handleClick}>
                            Deposit
                        </span>
                        <span className="font-bold text-white hover:text-[#78D39D] active:text-[#78D39D] md:py-1 " onClick={handleClick}>
                            Withdraw
                        </span>
                        <span className="font-bold text-white hover:text-[#78D39D] active:text-[#78D39D] md:py-1 " onClick={handleClick}>
                            Credit Transfer
                        </span>
                        <span className="font-bold text-white hover:text-[#78D39D] active:text-[#78D39D] md:py-1 " onClick={handleClick}>
                            Rollover
                        </span>
                    </div>
                </div>
            </div>
            {/* <!-- End Secbar --> */}
        </>
    );
};

export default Secbar;
