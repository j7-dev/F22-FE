import { BaseType, TMeta } from '@/types';

type TMedia = any;

export type TCmsPost = BaseType & {
    title: string;
    content: string;
    post_type: string;
    publishedAt: string;
    locale: string;
    send_to_user_ids: number[] | null;
    hide_to_user_ids: number[] | null;
    meta: TMeta[];
    feature_image: {
        data: TMedia;
    };
    content_images: {
        data: TMedia[];
    };
    localizations: {
        data: [];
    };
};
