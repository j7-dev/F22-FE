import Banner from '@/components/ContentLayout/Banner';
import PoplarGames from './PoplarGames';
import SlogGames from './SlogGames';

const Home = () => {
    // const { t } = useTranslation();

    return (
        <div className="w-full">
            <Banner />
            <PoplarGames />
            <SlogGames />
        </div>
    );
};

export default Home;
