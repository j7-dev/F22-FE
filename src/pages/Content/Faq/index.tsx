import React from 'react';
import { atom, useAtom } from 'jotai';
import { uniqBy } from 'lodash-es';
import { TFaq } from '@/types/resources';
import { useGetFaqs } from '@/hooks/useGetFaq';
import CategoryList from '@/components/ContentLayout/Faq/CategoryList';
import PostList from '@/components/ContentLayout/Faq/PostList';

export const categoryListAtom = atom<string>('notice');

const index: React.FC = () => {
    const [categoryListLabel, setCategoryListValue] = useAtom(categoryListAtom);

    //取得Faq的資料
    const { data, isLoading } = useGetFaqs();

    //uniqBy去重複的Category
    const fxnCategoryList = uniqBy(data, 'category[label]');

    //篩選帶入postList的資料
    const onFilter = (category: string) => {
        setCategoryListValue(category);
    };

    const fxnCategoryData = data?.filter((item: TFaq) => {
        return item?.category?.label === categoryListLabel;
    });
    return (
        <div className="w-full bg-[#F6F7F7] min-h-[500px]">
            {isLoading ? (
                <div>loading...</div>
            ) : (
                <div className="flex flex-row gap-5 md:flex-nowrap flex-wrap max-w-[1260px] w-full m-auto justify-start items-start p-5 pb-10">
                    <div className="md:max-w-[300px] w-full ">
                        <CategoryList onFilter={onFilter} categoryListData={fxnCategoryList} />
                    </div>
                    <div className="md:max-w-[900px] w-full">
                        <PostList categoryData={fxnCategoryData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default index;
