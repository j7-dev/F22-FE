import React from 'react';
import { Tag, FormProps } from 'antd';
import { Dayjs } from 'dayjs';
import { CloseCircleOutlined } from '@ant-design/icons';

const FilterTags: React.FC<{ searchFormProps: FormProps<any> }> = ({ searchFormProps }) => {
    const form = searchFormProps?.form;
    const searchValues = form ? form.getFieldsValue() : {};
    const handleClearSearchProps = (key: string) => () => {
        form?.resetFields([[key]]);
    };
    const searchKeys = Object.keys(searchValues || {});

    return (
        <>
            {searchValues &&
                searchKeys.map((key) => {
                    if (!searchValues?.[key]) return null;
                    if ('dateRange' !== key) {
                        return (
                            <Tag key={key} bordered={false} color="#108ee9" closeIcon={<CloseCircleOutlined />} onClose={handleClearSearchProps(key)}>
                                {key}: {searchValues?.[key]}
                            </Tag>
                        );
                    }
                    return (
                        <Tag key={key} bordered={false} color="#108ee9" closeIcon={<CloseCircleOutlined />} onClose={handleClearSearchProps(key)}>
                            {key}: {(searchValues[key] as Dayjs[]).map((date) => (date ? date.format('YYYY/MM/DD') : '')).join(' ~ ')}
                        </Tag>
                    );
                })}
        </>
    );
};

export default FilterTags;
