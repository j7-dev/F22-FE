import React from 'react';
import Banner from '@/components/ContentLayout/Banner';
import Pragmatic from './Pragmatic';

const index: React.FC = () => {
    // const { t } = useTranslation();
    // const windowWidth = useAtomValue(windowWidthAtom);
    return (
        <div className="home sm:my-9 my-4 w-full  flex flex-col gap-8">
            <Banner />
            <Pragmatic />
        </div>
    );
};

export default index;
