export * from './custom';

export type TConstant<T> = {
    label: string;
    value: T;
    color?: string;
};

export type TUserIdentity = {
    roles: string;
    userName: string;
};

export type TRoute = {
    path: string;
    element?: JSX.Element;
    children?: React.ReactNode | null;
};

export type TGetColumnFilterProps<T> = {
    dataSource: readonly TConstant<string | number | boolean>[] | readonly T[];
    dataIndex: keyof T;
    dataFrom?: 'local' | 'fetched';
    exactMatch?: boolean;
};

export type requestAtomType = {
    uuid: string;
    player: {
        id: string;
        updata: boolean;
        firstName: string;
        lastName: string;
        country: string;
        nickname?: string;
        language: string;
        currency: string;
        session: {
            id: string;
            ip: string;
        };
    };
    config: {
        game: {
            category?: string;
            interface?: string;
            table: {
                id: string;
            };
        };
        channel: {
            wrapped: boolean;
            mobile?: boolean;
        };
    };
};
