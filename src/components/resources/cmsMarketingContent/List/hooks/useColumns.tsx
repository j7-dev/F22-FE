import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditButton, DeleteButton } from '@refinedev/antd';
import { DataType, TPosition } from '@/components/resources/cmsMarketingContent/List/types';
import { useTranslation } from 'react-i18next';
import Image from '@/components/Admin/Image';

const { Paragraph } = Typography;

export const useColumns = (position: TPosition) => {
    const { t } = useTranslation();

    const modalColumns: ColumnsType<DataType> = [
        {
            title: t('#'),
            dataIndex: 'id',
        },
        {
            title: t('title'),
            dataIndex: 'title',
        },
        {
            title: t('content'),
            dataIndex: 'content',
            render: (content) => <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{content}</Paragraph>,
        },
        {
            title: t(''),
            fixed: 'right',
            dataIndex: 'action',
            render: (_, record) => (
                <p className="m-0 whitespace-nowrap">
                    <EditButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText className="mr-2" />
                    <DeleteButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText />
                </p>
            ),
        },
    ];

    const bannerColumns: ColumnsType<DataType> = [
        {
            title: t('#'),
            dataIndex: 'id',
        },
        {
            title: t('feature_image'),
            dataIndex: 'feature_image',
            render: (content) => <Image img={content} />,
        },
        {
            title: t('feature_image_mobile'),
            dataIndex: 'feature_image_mobile',
            render: (content) => <Image img={content} />,
        },
        {
            title: t(''),
            fixed: 'right',
            dataIndex: 'action',
            render: (_, record) => (
                <p className="m-0 whitespace-nowrap">
                    <EditButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText className="mr-2" />
                    <DeleteButton size="small" type="primary" shape="circle" recordItemId={record.id} hideText />
                </p>
            ),
        },
    ];

    switch (position) {
        case 'BANNER':
            return bannerColumns;
        case 'MODAL':
            return modalColumns;
        default:
            return bannerColumns;
    }
};
