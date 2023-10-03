import { useAtomValue } from 'jotai';
import { windowWidthAtom } from '@/components/ContentLayout';
import Banner from '@/components/ContentLayout/Banner';
import PopularGames from './PopularGames';
import SlogGames from './SlogGames';

const Home = () => {
    // const { t } = useTranslation();
    const windowWidth = useAtomValue(windowWidthAtom);
    return (
        <div className="home w-full my-9 flex flex-col gap-8">
            <Banner />
            <PopularGames />
            {windowWidth > 414 ? <SlogGames /> : ''}
        </div>
    );
};

export default Home;
