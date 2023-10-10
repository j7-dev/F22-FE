import React from 'react';
import { isNumber, isString, isNull, isUndefined } from 'lodash';
import { keyToWord } from '@/utils';
import { Empty, Form, Input } from 'antd';

type TColumn = {
    key: string;
    title: string;
    dataIndex: string;
    render?: (value: any, record: any, index: number, isEditing: boolean) => React.ReactNode;
};

const index: React.FC<{
    record: {
        [key: string]: any;
    };
    isEditing?: boolean;
    columns?: TColumn[];
}> = ({ record, columns, isEditing = false }) => {
    if (!record) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

    const defaultColumns = Object.keys(record)
        .map((key) => {
            if (isNumber(record?.[key]) || isString(record?.[key]) || isNull(record?.[key]) || isUndefined(record?.[key])) {
                return {
                    key,
                    title: keyToWord(key),
                    dataIndex: key,
                };
            }

            if (Array.isArray(record?.[key]) && (record?.[key] || []).every((item: any) => isNumber(item) || isString(item) || isNull(item) || isUndefined(item))) {
                return {
                    key,
                    title: keyToWord(key),
                    dataIndex: key,
                    render: (arr: (string | number)[], rowRecord: any, _k: number, rowIsEditing: boolean) =>
                        rowIsEditing ? (
                            <Form.Item className="m-0" name={[key]} initialValue={rowRecord?.[key]}>
                                <Input />
                            </Form.Item>
                        ) : (
                            arr.join(', ')
                        ),
                };
            }
        })
        .filter((c) => !!c) as TColumn[];

    const getView = (theColumn: TColumn, j: number) => {
        const render = theColumn?.render;
        const dataIndex = theColumn?.dataIndex;

        if (render) {
            return render(record?.[dataIndex as string], record, j, isEditing);
        }
        return isEditing ? (
            <Form.Item className="m-0" name={[dataIndex]} initialValue={record?.[dataIndex]}>
                <Input />
            </Form.Item>
        ) : (
            record?.[dataIndex as string]
        );
    };

    return (
        <table className="table table-vertical mb-4">
            <tbody>
                {(columns ? columns : defaultColumns).map((column, i) => {
                    return (
                        <tr key={column?.key}>
                            <th>{column?.title as string}</th>
                            <td>{getView(column, i)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default index;
