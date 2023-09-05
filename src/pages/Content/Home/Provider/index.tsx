import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type ProviderProps = {
    ProviderImg?: string;
    ProviderName?: string;
    ProviderPath?: string;
};
const index: React.FC<ProviderProps> = ({ ProviderImg, ProviderName, ProviderPath }) => {
    return (
        <div className="ProviderWrap w-full px-1">
            <Link to={ProviderPath as string}>
                <div className="ProviderImg w-full aspect-[3/2] relative">
                    <LazyLoadImage width="100%" height="100%" src={ProviderImg} alt={ProviderName} />
                    {/* <img className=" align-center object-contain w-full h-full object-center" src={ProviderImg} alt={ProviderName} /> */}
                </div>
                <div className="ProviderInfo bg-[#363F4E] px-2 py-2">
                    <span className="ProviderName text-white line-clamp-1 text-sm font-bold text-center">{ProviderName}</span>
                </div>
            </Link>
        </div>
    );
};

export default index;
