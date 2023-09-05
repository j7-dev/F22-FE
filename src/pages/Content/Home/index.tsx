import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import Banner from '@/components/ContentLayout/Banner';
import Provider from './Provider';
// import Promotions from '../../components/Layout/Promotions';
import { fakeProviderData } from './Provider/ProviderData';
import ProviderCategory from './Provider/ProviderCategory';
import { ProviderStateAtom, ProviderPathAtom } from './AtomSetting/index';

const Home = () => {
    const [ProviderState, setProviderState] = useAtom(ProviderStateAtom);
    const [ProviderPath, setProviderPath] = useAtom(ProviderPathAtom);

    const { t } = useTranslation();
    const ProviderData = ProviderState !== 'All' ? fakeProviderData.filter((item) => item['ProviderType'].includes(ProviderState)) : fakeProviderData;
    useEffect(() => {
        setProviderState('All');
        setProviderPath('');
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full">
            <Banner />

            <div className="flex max-w-4xl mx-auto gap-2.5 flex-wrap py-10 px-5 md:px-0">
                <ProviderCategory />
                <div className="grid grid-cols-2 gap-16 my-16">
                    {ProviderData.map((Item) => (
                        <div key={nanoid()}>
                            <Provider key={nanoid()} ProviderImg={Item.ProviderImg} ProviderName={Item.ProviderName} ProviderPath={Item.ProviderPath + ProviderPath} />
                        </div>
                    ))}
                </div>
            </div>
            {/* <Promotions /> */}
        </div>
    );
};

export default Home;
