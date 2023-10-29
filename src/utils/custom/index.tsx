import { Tag } from 'antd';

export const iso8601Format = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export const allowedRoles = ['agent', 'admin'];

export const languages = [
    { language: 'en', name: 'English', shortName: 'EN' },
    { language: 'ko', name: '한국어', shortName: 'KO' },
    // { language: 'tw', name: '繁體中文', shortName: 'TW' },
    // { language: 'cn', name: '简体中文', shortName: 'CN' },
];

export const statusColorEnum: {
    [key: string]: string;
} = {
    SUCCESS: 'green',
    FAILED: 'volcano',
    CANCEL: '#ccccc',
    PENDING: 'orange',
    REJECTED: 'red',
};

export const getStatusTag = (status: string) => {
    return <Tag color={statusColorEnum?.[status] || 'default'}>{status}</Tag>;
};
