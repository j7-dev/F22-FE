import { TUser } from '@/types';

export type TLoginDetail = {
    ip: string;
    login_url: string;
    user: TUser;
    user_agent: TUserAgent;
};

export type TUserAgent = {
    os?: {
        name: string;
        family: string;
        version: string;
        platform: string;
        short_name: string;
    };
    client?: {
        name: string;
        type: string;
        engine: string;
        family: string;
        version: string;
        short_name: string;
        engine_version: string;
    };
    device?: {
        id: string;
        type: string;
        brand: string;
        model: string;
    };
    [key: string]: any;
};
