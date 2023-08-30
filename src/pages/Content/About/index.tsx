import React from 'react';
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

const About: React.FC = () => (
    <>
        <div className="aboutSection w-full h-[500px] flex justify-center items-center">
            <div
                className="mainContainer h-full w-full flex justify-center items-center"
                style={{
                    backgroundImage: `url(${bgImg})`,
                }}
            >
                <img className="absolute top-10 left-60" src={slot} alt="" />
                <img
                    className="absolute bottom-28 left-12"
                    src={emoji}
                    alt=""
                />
                <img
                    className="absolute bottom-16 left-80"
                    src={bubble}
                    alt=""
                />
                <div className="title flex flex-col justify-center items-center gap-5">
                    <img src={smartplayEn} alt="" />
                    <span className="bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl">
                        Learn the standards of responsible play!
                    </span>
                    <button className="bg-[#4BA1FA] border-0 rounded-lg w-[145px] h-10 flex justify-center items-center text-white font-bold text-sm">
                        Inquiry
                    </button>
                </div>
                <img className="absolute top-16 right-72" src={bubble} alt="" />
                <img className="absolute top-28 right-16" src={card} alt="" />
                <img
                    className="absolute bottom-9 right-52"
                    src={roulette}
                    alt=""
                />
            </div>
        </div>
        <div className="responsibleSection-2">
            <div className="mainContainer p-16 h-full w-full flex flex-col gap-5 justify-center items-center bg-[#FAFAFA]">
                <img className="absolute bottom-0 left-0" src={girl1} alt="" />
                <div className="list-1 w-[750px] flex flex-col justify-center items-center gap-5">
                    <div className="headerTitle-1  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap">
                        Becoming deeply involved in gambling can cause various
                        problems
                    </div>
                    <div className="contentList-1">
                        <ul className="list-disc gap-2.5 flex flex-col my-0">
                            <li className="list-disc text-lg font-bold text-[#2B3240]">
                                Gambling addiction is a mental disorder in which
                                one becomes deeply involved in gambling and
                                loses control.
                            </li>
                            <li className="list-disc text-lg font-bold text-[#2B3240]">
                                Gambling addiction can cause disruptions in
                                daily life and social activities. That is,
                                gambling addiction can not only lead to debt
                                problems, but also to health issues such as
                                depression, and even social issues such as
                                suicide.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="list-2 w-[750px] flex flex-col justify-center items-center gap-5">
                    <div className="headerTitle-2  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap">
                        Gambling addiction is a risk that anyone can fall into.
                    </div>
                    <div className="contentList-2">
                        <ul className="list-disc gap-2.5 flex flex-col my-0">
                            <li className="list-disc text-lg font-bold text-[#2B3240]">
                                Stress from situations such as "work not going
                                well" and feelings of loneliness can lead to
                                relying on gambling, which in turn may lead to
                                becoming deeply involved in gambling.
                            </li>
                            <li className="list-disc text-lg font-bold text-[#2B3240]">
                                It is not necessarily caused by a "weak-willed"
                                or "careless" personality.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="list-3 w-[750px] flex flex-col justify-center items-center gap-5">
                    <div className="headerTitle-3  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap">
                        Beware of beginner's luck.
                    </div>
                    <div className="contentList-3">
                        <ul className="list-disc gap-2.5 flex flex-col my-0">
                            <li className="list-disc text-lg font-bold text-[#2B3240]">
                                It is said that starting gambling at a young age
                                can lead to a more severe addiction. Please note
                                that it is prohibited for people under the age
                                specified by law to engage in gambling
                                activities.
                            </li>
                        </ul>
                    </div>
                </div>
                <img className="absolute top-28 right-14" src={card1} alt="" />
                <img
                    className="absolute bottom-36 right-32"
                    src={dice}
                    alt=""
                />
            </div>
        </div>
        <div className="responsibleSection-3 h-[600px]">
            <div
                className="mainContainer  h-full w-full flex flex-col gap-5 justify-center items-center"
                style={{
                    backgroundImage: `url(${bgImg})`,
                }}
            >
                <img className="absolute top-14 left-32" src={cherry} alt="" />
                <img
                    className="absolute bottom-24 left-36"
                    src={crown}
                    alt=""
                />

                <div className="list-3 w-full flex flex-col justify-center items-center gap-5">
                    <img src={usefulEn} alt="" />
                    <div className="headerTitle-3  bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap">
                        Before you gamble, here is some useful information for
                        you.
                    </div>
                    <div className="contentList-3">
                        <div className="flex flex-col justify-center items-center gap-1 p-10 ">
                            <span className="bg-gradient-to-b from-[#673AB7] to-[#351A87] bg-clip-text text-transparent font-bold text-2xl">
                                Faithfully follow the rules you set for yourself
                            </span>
                            <span className="bg-gradient-to-b from-[#673AB7] to-[#351A87] bg-clip-text text-transparent font-bold text-2xl">
                                Judge based on overall wins and losses, not just
                                the immediate loss
                            </span>
                            <span className="bg-gradient-to-b from-[#673AB7] to-[#351A87] bg-clip-text text-transparent font-bold text-2xl">
                                Know when to quit and when to attack
                            </span>
                            <span className="bg-gradient-to-b from-[#673AB7] to-[#351A87] bg-clip-text text-transparent font-bold text-2xl">
                                Calmly analyze the reasons for your losses
                            </span>
                        </div>
                    </div>
                </div>
                <img
                    className="absolute bottom-0 right-[-5px]"
                    src={girl2}
                    alt=""
                />
            </div>
        </div>
        <div className="responsibleSection-4 h-[510px]">
            <div className="mainContainer  h-full w-full flex flex-col gap-5 justify-center items-center bg-[#FAFAFA]">
                <img className="absolute bottom-40 left-36" src={chip} alt="" />
                <img
                    className="absolute bottom-10 left-36"
                    src={bubble}
                    alt=""
                />
                <div className="list-4 w-full flex flex-col justify-center items-center gap-5">
                    <img src={inquiriesEn} alt="" />
                    <div className="headerTitle-4 flex flex-col  text-center">
                        <span className="bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap ">
                            Normal response time (approximate): 72 hours
                        </span>
                        <span className="bg-gradient-to-b from-[#1EC3F9] to-[#2F80ED] bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap">
                            Please contact us from your registered email
                            address.
                        </span>
                    </div>
                    <div className="contentList-1">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <img className="" src={emailImg} alt="" />
                            <button className="bg-[#4BA1FA] border-0 px-3 rounded-lg w-auto h-10 flex justify-center items-center text-white font-bold text-sm">
                                EMAIL: support@widusroyal.com
                            </button>
                        </div>
                    </div>
                </div>
                <img className="absolute top-16 right-60" src={bubble} alt="" />
                <img
                    className="absolute bottom-40 right-32"
                    src={slotMachine}
                    alt=""
                />
            </div>
        </div>
    </>
);

export default About;
