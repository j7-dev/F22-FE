import React from 'react';
import { atom } from 'jotai';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import SearchInput from './SearchInput';
// import SearchDropdown from './SearchDropdown';
// import FilterGames from './FilterGames';

export const dropdownIsOpenAtom = atom(false);
export const FilterGamesIsOpenAtom = atom(false);

const SearchBar: React.FC<{ onFilter: (value: any) => void }> = ({ onFilter }) => {
    const [form] = Form.useForm();
    const onFinishFilter = ({ searchGame }: { searchGame: string }) => {
        onFilter(searchGame);
    };
    return (
        <Form form={form} onFinish={onFinishFilter} className="customSearchBar w-full bg-[#ECE8FA] h-full rounded-2xl flex items-center py-1 px-4">
            <Form.Item name="searchGame" noStyle>
                <Input prefix={<SearchOutlined className="text-[#9680EA] text-xl pr-4" />} placeholder="Search" allowClear className="searchBarInput" bordered={false} />
            </Form.Item>
        </Form>
    );
};
export default SearchBar;
