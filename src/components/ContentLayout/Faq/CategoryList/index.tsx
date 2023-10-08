import React from 'react';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { useAtomValue } from 'jotai';
import { categoryListAtom } from '@/pages/Content/Faq/index';

const index: React.FC<{
    onFilter: (category: string) => void;
    categoryListData: {
        category: {
            label: string;
            value: string;
            icon: string;
        };
    }[];
}> = ({ onFilter, categoryListData }) => {
    const { t } = useTranslation();
    const categoryListLabel = useAtomValue(categoryListAtom);

    const handleClick = (category: string) => {
        onFilter(category);
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-[0_0px_29px_0px_rgba(43, 50, 64, 0.09)] flex flex-col gap-2.5 p-4">
            <div>
                <span className="text-[#2b324080] text-sm font-bold">{t('Service Center')}</span>
            </div>
            <div>
                <ul className="m-0 p-0 flex flex-col gap-2.5">
                    {categoryListData.map((item) => (
                        <li key={nanoid()}>
                            <button className={`flex gap-2.5 justify-start items-center w-full h-10 border-0 rounded-lg py-0 px-2.5 cursor-pointer ${categoryListLabel === item?.category.label ? 'bg-[#F3F3F4]' : 'bg-transparent'}`} onClick={() => handleClick(item.category.label)}>
                                <img src={item?.category.icon} alt="" />
                                <span className="font-bold text-[#2B3240] text-sm">{t(item?.category.value)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default index;
