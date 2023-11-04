import { Card, Form, Input, Button, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ResourceSelect from '@/components/form/ResourceSelect';
import { useGetSiteSetting } from '@/hooks';
import { searchPropsAtom } from '../atom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';

const { RangePicker } = DatePicker;
const STATUSES = ['NORMAL', 'PENDING', 'CANCELLED'];

const index: React.FC<{ user_id?: string | number }> = ({ user_id }) => {
    const [form] = Form.useForm();
    const { support_game_providers } = useGetSiteSetting();
    const handleSearch = () => {
        setSearchProps(form.getFieldsValue());
    };

    const [searchProps, setSearchProps] = useAtom(searchPropsAtom);
    useEffect(() => {
        if (user_id) {
            setSearchProps({
                ...searchProps,
                user_id,
            });
            form.setFieldValue(['user_id'], user_id);
        }
    }, [user_id]);
    return (
        <Card bordered={false}>
            <Form form={form} layout="vertical" onFinish={handleSearch}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-0">
                    <Form.Item label="Register Date" name={['dateRange']}>
                        <RangePicker size="small" className="w-full" />
                    </Form.Item>
                    <Form.Item label="Transaction Id" name={['txnId']}>
                        <Input size="small" allowClear placeholder="search transaction id or leave blank" prefix={<SearchOutlined />} />
                    </Form.Item>

                    <ResourceSelect formItemProps={{ label: 'User', name: ['user_id'], hidden: !!user_id }} fetchProps={{ resource: 'users', optionLabel: 'display_name', optionValue: 'id' }} selectProps={{ allowClear: true, size: 'small' }} />

                    <Form.Item label="Game Provider" name={['gameProvider']}>
                        <Select
                            size="small"
                            options={support_game_providers.map((item: string) => ({
                                label: item,
                                value: item,
                            }))}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item label="Status" name={['status']}>
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
                        <Button size="small" type="primary" className="w-full" htmlType="submit">
                            Filter
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Card>
    );
};

export default index;
