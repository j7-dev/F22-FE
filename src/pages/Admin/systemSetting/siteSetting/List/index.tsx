import { Show } from '@refinedev/antd';
import { useCustom, useApiUrl } from '@refinedev/core';
import { Card, Form } from 'antd';
import ObjectTable from '@/components/general/ObjectTable';
// import { EditOutlined } from '@ant-design/icons';

const index = () => {
    const apiUrl = useApiUrl();
    const { data, isLoading } = useCustom({
        url: `${apiUrl}/site-setting`,
        method: 'get',
    });

    const attributes = data?.data?.data?.attributes || {};
    const { createdAt: _createdAt, vip_upgrade_mode: _vip_upgrade_mode, company_info: _company_info, ...settings } = attributes;
    const [form] = Form.useForm();

    return (
        <Show
            isLoading={isLoading}
            title="Site Settings"
            canEdit={false}
            canDelete={false}
            contentProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: '24px 0px 24px 0px',
                },
            }}
        >
            {/* <p className="text-right">
                <Button type="primary" icon={<EditOutlined />}>
                    Edit
                </Button>
            </p> */}

            <Form form={form}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <Card title="settings">
                            <ObjectTable record={settings} />
                        </Card>
                    </div>
                    {/* <div>
                        <Card title="Company Info">
                            <ObjectTable record={company_info} />
                        </Card>
                    </div> */}
                </div>
            </Form>
        </Show>
    );
};

export default index;
