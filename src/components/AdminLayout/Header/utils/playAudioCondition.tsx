import { TTable3 } from '../types';

const playAudioCondition = (table3: TTable3) => {
    const table3String = localStorage.getItem('table3') || '[]';
    const isChange = JSON.stringify(table3) !== table3String;
    const totalPending = table3?.reduce((acc, cur) => acc + cur?.pending, 0);

    return isChange && totalPending !== 0;
};

export default playAudioCondition;
