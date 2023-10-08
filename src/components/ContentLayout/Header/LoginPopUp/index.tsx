import React, { useEffect, useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { GrFormClose } from 'react-icons/gr';
import { popupIsOpenAtom, loginOrSignUpAtom } from '@/components/ContentLayout/Header/LoginModule';
import Login from './Login';
import SignUp from './SignUp';

const Popup: React.FC = () => {
    // const Navigate = useNavigate();
    const popupContainerRef = useRef<HTMLDivElement>(null);
    const formCarouselRef = useRef<HTMLDivElement>(null);
    const [popupIsOpen, setPopupIsOpen] = useAtom(popupIsOpenAtom);
    const loginOrSignUp = useAtomValue(loginOrSignUpAtom);

    useEffect(() => {
        if (popupIsOpen) {
            document.body.style.overflow = 'hidden';
            if (loginOrSignUp && formCarouselRef.current) {
                formCarouselRef.current.style.transform = 'translateX(0%)';
            } else if (!loginOrSignUp && formCarouselRef.current) {
                formCarouselRef.current.style.transform = 'translateX(-50%)';
            }
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [popupIsOpen, loginOrSignUp]);

    const handleClick = () => {
        setPopupIsOpen(!popupIsOpen);
    };
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (popupContainerRef.current && !popupContainerRef.current.contains(event.target as Node)) {
            handleClick();
        }
    };

    return (
        <div className={`${popupIsOpen ? 'fixed' : 'hidden'} popupOverlay px-2 md:px-0 w-full h-full backdrop-blur-sm bg-[#000000d9] z-50 left-0 top-0 flex justify-center items-center`} onClick={handleOverlayClick}>
            <div ref={popupContainerRef} className="popupContainer  w-full py-10 md:m-auto md:pt-[150px] md:max-w-[600px] md:min-h-[700px] rounded-[20px] bg-gradient-to-r from-[#E9AAF1] to-[#8155EC]">
                <div className="closeBtn absolute right-5 top-5 z-10 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl rounded-md bg-[#F6F7F7] hover:bg-[#e5e5e5]" onClick={handleClick}>
                    <GrFormClose size={40} />
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center max-w-[90%] md:max-w-[400px] m-auto">
                    <div className="formWrap flex flex-nowrap overflow-hidden w-full">
                        <div ref={formCarouselRef} className="min-w-[200%] flex duration-300 p" id="formCarousel">
                            <Login />
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
