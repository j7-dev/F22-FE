export type TFaq = {
    content?: string;
    createdAt: string;
    id: number;
    locale: string;
    localizations?: any[];
    meta: TFaqMeta[];
    post_type: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    category?: {
        label: string;
        value: string;
    };
};

type TFaqMeta = {
    id: number;
    meta_key: string;
    meta_value: string;
};
