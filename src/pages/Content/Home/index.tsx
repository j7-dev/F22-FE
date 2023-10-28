import React from 'react';
import { useSetAtom } from 'jotai';
import Banner from '@/components/ContentLayout/Banner';
import PopularGames from './PopularGames';
import SlogGames from './SlogGames';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import { useShowPc } from '@/hooks/useShowPc';
import banner_A from '@/assets/images/newBanner/banner_A.jpg';
import banner_B from '@/assets/images/newBanner/banner_B.jpg';
import banner_C from '@/assets/images/newBanner/banner_C.jpg';
import banner_A_mobile from '@/assets/images/newBanner/banner_A_mobile.jpg';
import banner_B_mobile from '@/assets/images/newBanner/banner_B_mobile.jpg';
import banner_C_mobile from '@/assets/images/newBanner/banner_C_mobile.jpg';

const bannerData = [
    {
        img: banner_A,
        img_mobile: banner_A_mobile,
    },
    {
        img: banner_B,
        img_mobile: banner_B_mobile,
    },
    {
        img: banner_C,
        img_mobile: banner_C_mobile,
    },
];

const Home = () => {
    const showPc = useShowPc();
    const setActiveMenu = useSetAtom(activeMenuAtom);
    const { data } = useGetMarketingContent({ position: 'header' });

    const marqueeText = data?.map((item) => {
        return item?.content;
    });
    React.useEffect(() => {
        setActiveMenu('');
    }, []);
    return (
        <div className="home sm:my-9 my-4 w-full flex flex-col sm:gap-8 gap-4">
            <Banner bannerData={bannerData} />
            {!showPc ? <NewsMarquee speed={15} marqueeText={marqueeText} /> : ''}
            <PopularGames />
            {showPc ? <SlogGames /> : ''}
        </div>
    );
};

export default Home;
