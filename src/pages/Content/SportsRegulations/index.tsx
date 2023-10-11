import React from 'react';
import { useTranslation } from 'react-i18next';

const index: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="sm:m-8 p-8 sm:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] rounded-2xl bg-white">
            <div className="flex flex-col items-center ">
                <h2 className="font-bold text-5xl mt-5 tracking-tight">{t('Sports Regulations')}</h2>
                <p className="text-neutral-500 text-xl mt-3">{t('Frequenty asked questions')}</p>
            </div>
            <div className="m-2 space-y-4 font-semibold">
                <div className="group shadow-[0_4px_4px_0px_rgba(163,112,237,0.25)] flex flex-col gap-2 rounded-lg bg-white p-5 text-black" tabIndex={1}>
                    <div className="flex cursor-pointer items-center justify-between">
                        <span> HTML </span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png" className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180" />
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
                <div className="group shadow-[0_4px_4px_0px_rgba(163,112,237,0.25)] flex flex-col gap-2 rounded-lg bg-white p-5 text-black" tabIndex={2}>
                    <div className="flex cursor-pointer items-center justify-between">
                        <span> CSS </span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png" className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180" />
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>

                <div className="group shadow-[0_4px_4px_0px_rgba(163,112,237,0.25)] flex flex-col gap-2 rounded-lg bg-white p-5 text-black" tabIndex={3}>
                    <div className="flex cursor-pointer items-center justify-between">
                        <span> JAVASCRIPT </span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png" className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180" />
                    </div>
                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
            </div>
        </div>
    );
};

export default index;
