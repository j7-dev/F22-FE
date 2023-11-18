import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Switch } from 'antd';

const index: React.FC<{ formType: 'create' | 'edit' }> = ({ formType }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { t } = useTranslation();
    const handleChangePassword = (checked: boolean) => {
        setIsEditing(checked);
    };

    if (formType === 'create') {
        return (
            <div>
                <p className="mb-2">{t('Password')}</p>

                <Form.Item name="password" className="mt-4">
                    <Input.Password />
                </Form.Item>
            </div>
        );
    }

    if (formType === 'edit') {
        return (
            <div>
                <p className="mb-2">
                    {t('change password')} <Switch size="small" onChange={handleChangePassword} className="ml-4" />
                </p>

                <Form.Item name="password" className="mt-4">
                    <Input.Password disabled={!isEditing} />
                </Form.Item>
            </div>
        );
    }

    return <></>;
};

export default index;
