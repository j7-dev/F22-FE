import BonusCard from '../BonusCard';
import { Divider, Form, Input } from 'antd';

const items = [
    {
        key: 'sport_bonus',
        image: 'https://www.bet365.com/home/images//Home/imgs/V9Offers/pbb_Soccer-EPO.webp',
        title: 'SPORT BONUS',
        description: 'Get your bets paid out if the team you back goes 2 goals ahead - for multiple bets the selection will be marked as a winner with bet365.',
    },
    {
        key: 'deposit_bonus',
        image: 'https://www.bet365.com/home/images//Home/imgs/V9Offers/pbb_Soccer-SoccerAccumulatorBonus.webp',
        title: 'DEPOSIT BONUS',
        description: 'Get your bets paid out if the team you back goes 2 goals ahead - for multiple bets the selection will be marked as a winner with bet365.',
    },
    {
        key: 'other_bonus',
        image: 'https://www.bet365.com/home/images//Home/imgs/V9Offers/pbb_Tennis-AccumulatorBonus.webp',
        title: 'OTHER BONUS',
        description: 'Get your bets paid out if the team you back goes 2 goals ahead - for multiple bets the selection will be marked as a winner with bet365.',
    },
];

export type TItem = (typeof items)[0];

const index = () => {
    const form = Form.useFormInstance();
    const handleClick = (item: TItem) => () => {
        form.setFieldsValue({
            chosen_bonus: item.key,
        });
    };

    const watchChosenBonus = Form.useWatch(['chosen_bonus'], form);

    return (
        <div>
            <Divider plain className="mt-8 mb-16">
                Choose your Deposit Bonus
            </Divider>
            <div className="grid grid-cols-3 gap-6">
                {items.map((item) => (
                    <BonusCard key={item.key} item={item} onClick={handleClick(item)} isActive={item.key === watchChosenBonus} />
                ))}
                <Form.Item name={['chosen_bonus']} hidden>
                    <Input />
                </Form.Item>
            </div>
        </div>
    );
};

export default index;
