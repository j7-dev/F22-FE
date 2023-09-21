import { useEffect } from 'react';
import List from '../List';
import { listTypeAtom } from '../List/atom';
import { useSetAtom } from 'jotai';

const index = () => {
    const setListType = useSetAtom(listTypeAtom);
    useEffect(() => {
        setListType('DEPOSIT');
    }, []);
    return <List />;
};

export default index;
