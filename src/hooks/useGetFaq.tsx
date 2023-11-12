import { useList } from '@refinedev/core';
import dayjs from 'dayjs';
import { TFaq } from '@/types';
import noticeImg from '@/assets/images/notice-icon.svg';
import faqIcon from '@/assets/images/faq-icon.svg';
import promoIcon from '@/assets/images/promo-icon.svg';
import inquiryIcon from '@/assets/images/inquiry-icon.svg';
import affiliatesIcon from '@/assets/images/affiliates-icon.svg';

const mappingCategoryIcon = (label: string) => {
    if (label === 'notice') return noticeImg;
    if (label === 'announcement') return noticeImg;
    if (label === 'promotion') return promoIcon;
    if (label === 'inquiry') return inquiryIcon;
    if (label === 'partnership') return affiliatesIcon;
    return faqIcon;
};

export const useGetFaqs = () => {
    const { data: fetchData, isLoading } = useList<TFaq>({
        resource: 'cms-posts',
        meta: {
            populate: '*',
        },
        filters: [
            {
                field: 'post_type',
                operator: 'eq',
                value: 'faq',
            },
        ],
    });

    const data = fetchData?.data.map((item) => {
        return {
            ...item,
            fxnDate: dayjs(item.createdAt).format('YYYY MM DD , HH:mm') as string,
            category: {
                label: item?.meta?.[0].meta_key,
                value: item?.meta?.[0].meta_value,
                icon: mappingCategoryIcon(item?.meta?.[0].meta_key),
            },
        };
    });
    return {
        data,
        isLoading,
    };
};
