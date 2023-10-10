import React from 'react';
import { useSetAtom } from 'jotai';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import slot from '@/assets/images/slot.png';
import emoji from '@/assets/images/emoji.png';
import bubble from '@/assets/images/bubble.png';
import smartplayEn from '@/assets/images/smartplay-en_US.png';
import card from '@/assets/images/card.png';
import roulette from '@/assets/images/roulette.png';
import girl1 from '@/assets/images/girl-1.png';
import card1 from '@/assets/images/card (1).png';
import dice from '@/assets/images/dice.png';
import cherry from '@/assets/images/cherry.png';
import crown from '@/assets/images/crown.png';
import usefulEn from '@/assets/images/useful-en_US.png';
import girl2 from '@/assets/images/girl-2.png';
import chip from '@/assets/images/chip.png';
import emailImg from '@/assets/images/email-img.png';
import inquiriesEn from '@/assets/images/inquiries-en_US.png';
import slotMachine from '@/assets/images/slot-machine.png';
import bgImg from '@/assets/images/bg.jpg';
import { serviceCenterAtom } from '@/components/ContentLayout/Customer/ServiceCenter';

const About: React.FC = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const serviceCenterValue = useSetAtom(serviceCenterAtom);
    const handleClickToInquiry = () => {
        serviceCenterValue('1:1 Inquiry');
        Navigate('/customer');
    };

    return (
        <>
            <div className="aboutSection w-full relative">
                <div
                    className="mainContainer relative h-full w-full overflow-hidden bg-no-repeat bg-cover pt-32 pb-44 px-8 flex justify-center"
                    style={{
                        backgroundImage: `url(${bgImg})`,
                    }}
                >
                    <img className="scale-50 md:scale-100 z-0 absolute top-[10%] md:top-[20%] left-[16%] -ml-[60px] -mt-[60px]" src={slot} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[60%] left-[7%] -ml-[83px] -mt-[83px]" src={emoji} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[80%] left-[19%] -ml-[33px] -mt-[34px]" src={bubble} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[15%] md:top-[19%] left-[83%] -ml-[33px] -mt-[34px]" src={bubble} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[43%] md:top-[40%] left-[93%] -ml-[70px] -mt-[88px]" src={card} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[80%] left-[81%] -ml-[113px] -mt-[60px]" src={roulette} />
                    <div className="title w-full md:w-[750px] flex flex-col justify-center items-center gap-5 mb-12 z-90 relative">
                        <img className="h-auto w-full md:h-[70px] md:w-auto" src={smartplayEn} />
                        <span className="text-center px-8 bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl">{t('Learn the standards of responsible play!')}</span>
                        <button className="bg-[#4BA1FA] border-0 rounded-lg w-[145px] h-10 flex justify-center items-center text-white font-bold text-sm cursor-pointer" onClick={handleClickToInquiry}>
                            {t('Inquiry')}
                        </button>
                    </div>
                </div>
            </div>
            <div className="responsibleSection-2 relative">
                <div className="mainContainer pt-16 pb-48 md:pb-16 px-8 md:px-16 h-full w-full flex flex-col gap-5 justify-center items-center bg-[#FAFAFA] overflow-hidden">
                    <img className="w-[150px] md:w-[299px] z-0 absolute bottom-0 left-0" src={girl1} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[22%] left-[92%] -ml-[91px] -mt-[70px]" src={card1} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[72%] md:top-[77%] left-[93%] md:left-[89%] -ml-[79px] -mt-[60px]" src={dice} />
                    <div className="list-1 w-full md:w-[750px] flex flex-col justify-center items-center gap-5 mb-12">
                        <div className="headerTitle-1  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl text-center">{t('Becoming deeply involved in gambling can cause various problems')}</div>
                        <div className="contentList-1">
                            <ul className="list-disc gap-2.5 flex flex-col m-0 p-0">
                                <li className="list-disc text-lg font-normal text-[#2B3240]">
                                    <Trans i18nKey="Becoming Content" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="list-2 w-full md:w-[750px] flex flex-col justify-center items-center gap-5 mb-12">
                        <div className="headerTitle-2  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl text-center">{t('Gambling addiction is a risk that anyone can fall into')}</div>
                        <div className="contentList-2">
                            <ul className="list-disc gap-2.5 flex flex-col m-0 p-0">
                                <li className="list-disc text-lg font-normal text-[#2B3240]">
                                    <Trans i18nKey="Gambling Content" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="list-3 w-full md:w-[750px] flex flex-col justify-center items-center gap-5 mb-12">
                        <div className="headerTitle-3  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl text-center">{t('Beware of beginner luck.')}</div>
                        <div className="contentList-3">
                            <ul className="list-disc gap-2.5 flex flex-col m-0 p-0">
                                <li className="list-disc text-lg font-normal text-[#2B3240]">
                                    <Trans i18nKey="Beware Content" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="responsibleSection-3 relative">
                <div
                    className="mainContainer h-full w-full pt-24 pb-48 md:pb-32 px-8 bg-cover bg-no-repeat overflow-hidden"
                    style={{
                        backgroundImage: `url(${bgImg})`,
                    }}
                >
                    <img className="scale-50 md:scale-100 z-0 absolute top-[21%] left-[11%] -ml-[75px] -mt-[70px]" src={cherry} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[74%] left-[11%] -ml-[65px] -mt-[60px]" src={crown} />
                    <img className="w-[173px] md:w-[346px] z-0 absolute bottom-0 right-0" src={girl2} />

                    <div className="list-3 w-full flex flex-col justify-center items-center gap-5 mb-12">
                        <img className="h-auto w-full md:h-[70px] md:w-auto" src={usefulEn} />
                        <div className="headerTitle-3 bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl text-center">{t('Before you gamble, here is some useful information for you.')}</div>
                        <div className="contentList-3">
                            <div className="">
                                <span className="max-w-3xl text-[#2B3240] font-normal text-lg">
                                    <Trans i18nKey="Before Content" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="responsibleSection-4 relative">
                <div className="mainContainer h-full w-full bg-[#FAFAFA] pt-24 pb-16 px-8">
                    <img className="scale-50 md:scale-100 z-0 absolute top-[41%] left-[10%] -ml-[93px] -mt-[70px]" src={chip} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[89%] left-[14%] -ml-[33px] -mt-[34px]" src={bubble} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[25%] md:top-[20%] left-[90%] -ml-[33px] -mt-[34px]" src={bubble} />
                    <img className="scale-50 md:scale-100 z-0 absolute top-[64%] left-[90%] -ml-[59px] -mt-[70px]" src={slotMachine} />
                    <div className="list-4 w-full flex flex-col justify-center items-center gap-5 mb-12">
                        <img className="h-auto w-full md:h-[70px] md:w-auto" src={inquiriesEn} />
                        <div className="headerTitle-4 flex flex-col  text-center">
                            <span className="bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl  ">{t('Normal response time (approximate): 72 hours')}</span>
                            <span className="bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl ">{t('Please contact us from your registered email address.')}</span>
                        </div>
                        <div className="contentList-1">
                            <div className="flex flex-col justify-center items-center gap-5 mb-12">
                                <img className="" src={emailImg} />
                                <button className="bg-[#4BA1FA] border-0 px-3 rounded-lg w-auto h-10 flex justify-center items-center text-white font-bold text-sm">EMAIL: support@smtbet7.com</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default About;
