import { Form, Button, DatePicker, FormProps, Select, Card, Input } from 'antd';
import dayjs from 'dayjs';
import { useUserSelect, useGetSiteSetting } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';
import ResourceSelect from '@/components/form/ResourceSelect';
import { useResource } from '@refinedev/core';

const { RangePicker } = DatePicker;
const STATUSES = ['NORMAL', 'PENDING', 'CANCEL'];

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { t } = useTranslation();
    const { support_game_providers } = useGetSiteSetting();

    const { selectProps } = useUserSelect({
        roleType: 'authenticated',
    });

    const { action, id, identifier } = useResource();
    const isUserAdjustment = action === 'show' && identifier === 'members-list';

    const user_id = isUserAdjustment ? Number(id) : undefined;

    return (
        <Card bordered={false}>
            <Form {...formProps} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label={t('date')} name={['dateRange']} initialValue={[dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')]}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>

                    <Form.Item label={t('User')} name={['user']} hidden={!!user_id}>
                        <Select size="small" {...selectProps} allowClear />
                    </Form.Item>

                    <Form.Item label={t('Transaction Id')} name={['ref_id']}>
                        <Input size="small" allowClear placeholder={t('search transaction id or leave blank')} prefix={<SearchOutlined />} />
                    </Form.Item>

                    <ResourceSelect formItemProps={{ label: t('User'), name: ['user_id'], hidden: !!user_id }} fetchProps={{ resource: 'users', optionLabel: 'username', optionValue: 'id' }} selectProps={{ allowClear: true, size: 'small' }} />

                    <Form.Item label={t('Game Provider')} name={['gameProvider']}>
                        <Select
                            size="small"
                            options={support_game_providers.map((item: string) => ({
                                label: item,
                                value: item,
                            }))}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item label={t('Status')} name={['status']}>
                        <Select
                            size="small"
                            options={STATUSES.map((item: string) => ({
                                label: item,
                                value: item,
                            }))}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item className="self-end">
                        <Button size="small" type="primary" htmlType="submit" className="w-full">
                            {t('Search')}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};

export default Filter;
