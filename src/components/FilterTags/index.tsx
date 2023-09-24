import React from 'react';
import { Tag, FormInstance } from 'antd';
import { Dayjs } from 'dayjs';
import { CloseCircleOutlined } from '@ant-design/icons';

const FilterTags: React.FC<{ form?: FormInstance }> = ({ form }) => {
    const searchValues = form ? form.getFieldsValue() : {};
    const handleClearSearchProps = (key: string) => () => {
        form?.setFieldValue([key], undefined);
        form?.submit();
    };
    const searchKeys = Object.keys(searchValues || {});

    return (
        <>
            {searchValues &&
                searchKeys.map((key) => {
                    if (!searchValues?.[key]) return null;
                    if ('dateRange' !== key) {
                        return (
                            <Tag key={key} bordered={false} color="cyan" className="px-2.5 py-0.5" closeIcon={<CloseCircleOutlined />} onClose={handleClearSearchProps(key)}>
                                {key}: {searchValues?.[key]}
                            </Tag>
                        );
                    }
                    return (
                        <Tag key={key} bordered={false} color="cyan" className="px-2.5 py-0.5" closeIcon={<CloseCircleOutlined />} onClose={handleClearSearchProps(key)}>
                            {key}: {(searchValues[key] as Dayjs[]).map((date) => (date ? date.format('YYYY/MM/DD') : '')).join(' ~ ')}
                        </Tag>
                    );
                })}
        </>
    );
};

export default FilterTags;
