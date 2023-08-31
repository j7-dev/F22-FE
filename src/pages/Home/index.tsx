import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import Banner from '../../components/Layout/Banner';
import Provider from './Provider';
import Promotions from '../../components/Layout/Promotions';
import { fakeProviderData } from './Provider/ProviderData';

const Home = () => {
    const { t } = useTranslation();
    const ProviderData = fakeProviderData;
    return (
        <div className="w-full">
            <Banner />

            <div className="flex max-w-4xl mx-auto gap-2.5 flex-wrap py-10">
                <h2 className="w-full text-center text-3xl">
                    {t('All Provider')}
                </h2>
                {ProviderData.map((Item) => (
                    <div key={nanoid()} className="w-[calc(50%-5px)]">
                        <Provider
                            key={nanoid()}
                            ProviderImg={Item.ProviderImg}
                            ProviderName={Item.ProviderName}
                            ProviderPath={Item.ProviderPath}
                        />
                    </div>
                ))}
            </div>
            <Promotions />
        </div>
    );
};

export default Home;
