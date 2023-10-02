import Banner from '@/components/ContentLayout/Banner';
import PopularGames from './PopularGames';
import SlogGames from './SlogGames';

const Home = () => {
    // const { t } = useTranslation();

    return (
        <div className="home w-full my-9 flex flex-col gap-8">
            <Banner />
            <PopularGames />
            <SlogGames />
        </div>
    );
};

export default Home;
