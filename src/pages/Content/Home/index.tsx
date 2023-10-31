import React from 'react';
import { useSetAtom } from 'jotai';
import Banner from '@/components/ContentLayout/Banner';
import PopularGames from './PopularGames';
import SlogGames from './SlogGames';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';
import { useGetMarketingContent } from '@/hooks/useGetMarketingContent';
import { useShowPc } from '@/hooks/useShowPc';

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
            <Banner />
            {!showPc ? <NewsMarquee speed={15} marqueeText={marqueeText} /> : ''}
            <PopularGames />
            {showPc ? <SlogGames /> : ''}
        </div>
    );
};

export default Home;
