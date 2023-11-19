import { useTranslation } from 'react-i18next';
import { Switch, Form } from 'antd';
import { useGetSiteSetting } from '@/hooks';
import { useState, useEffect } from 'react';

const index = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();
    const watchRole = Form.useWatch('role', form);
    const siteSetting = useGetSiteSetting();
    const rolesMapping = siteSetting?.roles || {};
    const handleChange = (checked: boolean) => {
        setChecked(checked);
        form.setFieldsValue({
            role: checked ? 'agent' : 'authenticated',
        });
    };
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (watchRole && typeof watchRole === 'number') {
            setChecked(watchRole === rolesMapping?.agent);
        }
    }, [watchRole]);

    return (
        <div>
            <p>{t('Switch to Agent')}</p>
            <Switch onChange={handleChange} checked={checked} />
        </div>
    );
};

export default index;
