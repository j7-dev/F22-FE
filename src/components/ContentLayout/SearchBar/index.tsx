import React from 'react';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash-es';
import { useTranslation } from 'react-i18next';

const SearchBar: React.FC<{ onFilter: (value: string) => void }> = ({ onFilter }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    //使用onValuesChange在輸入時即時觸發，並且加上debounce
    const onFinishFilter = ({ searchGame }: { searchGame: string }) => {
        //重新定義searchGame 如果為空值則等於all
        searchGame = searchGame || 'all';
        onFilter(searchGame);
    };
    return (
        <Form form={form} onValuesChange={debounce(onFinishFilter, 500)} onFinish={onFinishFilter} className="customSearchBar w-full bg-[#ECE8FA] h-full rounded-2xl flex items-center py-1 px-4">
            <Form.Item name="searchGame" noStyle>
                <Input prefix={<SearchOutlined className="text-[#9680EA] text-xl pr-4" />} placeholder={t('Search')} allowClear className="searchBarInput" bordered={false} />
            </Form.Item>
        </Form>
    );
};
export default SearchBar;
