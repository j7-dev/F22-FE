import React from 'react';

const index: React.FC = () => {
    return (
        <div className="eventPage sm:my-9 sm:gap-8 my-4 w-full flex flex-col gap-4">
            <div className="shadowSection w-auto rounded-2xl px-4 bg-white md:px-0 md:py-4 md:mx-4 md:shadow-[0_4px_20px_0px_rgba(163,112,237,0.25)] ">
                <iframe scrolling="no" frameBorder="0" style={{ width: '1000px', height: '800px' }} allowFullScreen={true} src="http://api.tgame365.com/api/?gtype=graph&uid=2427051&hash=8b2da7d6cf0bf16793042c186815b9e3" />
            </div>
        </div>
    );
};

export default index;
