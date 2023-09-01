import React from 'react';
import { Link } from 'react-router-dom';

type ProviderProps = {
    ProviderImg?: string;
    ProviderName?: string;
    ProviderPath?: string;
};
const index: React.FC<ProviderProps> = ({
    ProviderImg,
    ProviderName,
    ProviderPath,
}) => (
    <div className="gameWrap w-full px-1">
        <Link to={ProviderPath as string}>
            <div className="gameImg w-full aspect-[3/2]  relative">
                <img
                    className=" align-center object-contain w-full h-full object-center"
                    src={ProviderImg}
                    alt={ProviderName}
                />
            </div>
            <div className="gameInfo bg-[#363F4E] px-2 py-2">
                <span className="gameName text-white line-clamp-1 mt-2 text-sm">
                    {ProviderName}
                </span>
            </div>
        </Link>
    </div>
);

export default index;
