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
    children?: TRoute[];
};

export type TGetColumnFilterProps<T> = {
    dataSource: readonly TConstant<string | number | boolean>[] | readonly T[];
    dataIndex: keyof T;
    dataFrom?: 'local' | 'fetched';
    exactMatch?: boolean;
};
