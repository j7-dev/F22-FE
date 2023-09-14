export type TUser = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: false;
    createdAt: string;
    updatedAt: string;
    display_name: string | null;
    phone: string | null;
    gender: string | null;
    birthday: string | null;
    role: TRole;
};

export type TRole = {
    id: number;
    name: string;
    description: string | null;
    type: string;
    createdAt: string;
    updatedAt: string;
};
