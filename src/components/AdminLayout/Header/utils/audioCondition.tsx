import { TTable3 } from '../types';

const audioCondition = (table3: TTable3) => {
    return table3.some((item) => (item?.pending || 0) > 0);
};

export default audioCondition;
