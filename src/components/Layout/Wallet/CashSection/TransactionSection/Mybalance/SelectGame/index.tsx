import React from 'react';
import { Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';

interface SelectGameProps {
    label?: string;
    itemName?: string;
    className?: string;
}
const index: React.FC<SelectGameProps> = ({ label, itemName, className }) => {
    const { t } = useTranslation();
    const fakeSelect = [
        {
            label: 'Manager',
            options: [
                { label: 'Jack', value: 'jack' },
                { label: 'Lucy', value: 'lucy' },
            ],
        },
        {
            label: 'Engineer',
            options: [{ label: 'yiminghe', value: 'Yiminghe' }],
        },
    ];
    return (
        <>
            {label && (
                <p className="font-bold text-sm text-[#2B3240]">{label}</p>
            )}
            <Form.Item name={itemName} className={className}>
                <Select
                    className="w-full"
                    showSearch
                    placeholder={t('Please Select a game')}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={fakeSelect}
                />
            </Form.Item>
        </>
    );
};

export default index;
