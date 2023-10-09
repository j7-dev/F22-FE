import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { windowWidthAtom } from '@/components/ContentLayout';
import Banner from '@/components/ContentLayout/Banner';
import PopularGames from './PopularGames';
import SlogGames from './SlogGames';
import NewsMarquee from '@/components/ContentLayout/NewsMarquee';
import { activeMenuAtom } from '@/components/ContentLayout/Sidebar';

const Home = () => {
    // const { t } = useTranslation();
    const setActiveMenu = useSetAtom(activeMenuAtom);
    const windowWidth = useAtomValue(windowWidthAtom);
    React.useEffect(() => {
        setActiveMenu('');
    }, []);
    return (
        <div className="home sm:my-9 my-4 w-full  flex flex-col gap-8">
            <Banner />
            {windowWidth <= 414 ? <NewsMarquee speed={15} marqueeText={['Lorem ipsum dolor sit amet consectetur. Auctor rhoncus non pharetra sollicitudin.']} /> : ''}
            <PopularGames />
            {windowWidth > 414 ? <SlogGames /> : ''}
        </div>
    );
};

export default Home;
