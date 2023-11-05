import { TCommission } from '@/types';
import { Tag, Timeline } from 'antd';
import SimpleAmount from '@/components/Admin/SimpleAmount';

type TProps = {
    commission: TCommission;
};

type TFormula = {
    gt: number;
    ratio: number;
};

const index = ({ commission }: TProps) => {
    const formula = (commission?.formula || []) as TFormula[];

    return (
        <>
            <Timeline
                className="mt-8 -mb-8"
                items={formula.map((item) => {
                    return {
                        children: (
                            <div className="flex justify-between w-60">
                                <SimpleAmount amount={item?.gt} />
                                <Tag className="ml-4" color="magenta">
                                    {item.ratio}%
                                </Tag>
                            </div>
                        ),
                    };
                })}
            />
        </>
    );
};

export default index;
