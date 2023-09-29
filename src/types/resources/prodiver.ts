export type TProviders = {
    label: string;
    value: string;
    providerData: TProvider;
};

export type TProvider = {
    providerMainImg: string;
    providerSmallImg: string;
    providerFavIcon: string;
    providerDescribe: string;
    providerPath?: string;
};
