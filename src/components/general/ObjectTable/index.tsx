import React from 'react';
import { isNumber, isString, isNull, isUndefined } from 'lodash';
import { keyToWord } from '@/utils';

type TColumn = {
    key: string;
    title: string;
    dataIndex: string;
    render?: (value: any, record: any, index: number) => React.ReactNode;
};

const index: React.FC<{
    record: {
        [key: string]: any;
    };
    columns?: TColumn[];
}> = ({ record, columns }) => {
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
                    render: (arr: (string | number)[]) => arr.join(', '),
                };
            }
        })
        .filter((c) => !!c) as TColumn[];

    return (
        <table className="table table-vertical mb-4">
            <tbody>
                {(columns ? columns : defaultColumns).map((column, i) => {
                    const render = column?.render;
                    const dataIndex = column?.dataIndex;

                    return (
                        <tr key={column?.key}>
                            <th>{column?.title as string}</th>
                            <td>{render ? render(record?.[dataIndex as string], record, i) : record?.[dataIndex as string]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default index;
