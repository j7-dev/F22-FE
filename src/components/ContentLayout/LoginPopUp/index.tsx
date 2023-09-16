import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { GrFormClose } from 'react-icons/gr';
import logoLogin from '@/assets/images/logo.png';
import { popupIsOpenAtom } from '@/components/ContentLayout/LoginModule';
import Login from './Login';
import SignUp from './SignUp';

const Popup: React.FC = () => {
    // const Navigate = useNavigate();
    const popupContainerRef = useRef<HTMLDivElement>(null);
    const formCarouselRef = useRef<HTMLDivElement>(null);
    const [popupIsOpen, setPopupIsOpen] = useAtom(popupIsOpenAtom);

    useEffect(() => {
        if (popupIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [popupIsOpen]);

    const handleClick = () => {
        setPopupIsOpen(!popupIsOpen);
    };
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (popupContainerRef.current && !popupContainerRef.current.contains(event.target as Node)) {
            handleClick();
        }
    };

    return (
        <div className={`${popupIsOpen ? 'fixed' : 'hidden'} popupOverlay w-full h-full bg-[#000000d9] z-50 left-0 top-0 flex justify-center items-center`} onClick={handleOverlayClick}>
            <div ref={popupContainerRef} className="popupContainer m-auto w-full md:max-w-[530px] min-h-[500px] bg-white rounded-3xl ">
                <div className="closeBtn absolute right-5 top-5 z-10 cursor-pointer w-10 h-10 flex justify-center items-center text-2xl rounded-md bg-[#F6F7F7] hover:bg-[#e5e5e5]" onClick={handleClick}>
                    <GrFormClose size={40} />
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-8 md:p-16">
                    <img src={logoLogin} alt="" className="w-full" />
                    <div className="formWrap flex flex-nowrap overflow-hidden w-full">
                        <div ref={formCarouselRef} className="min-w-[200%] flex duration-300" id="formCarousel">
                            <Login formCarousel={formCarouselRef.current || undefined} />
                            <SignUp formCarousel={formCarouselRef.current || undefined} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
