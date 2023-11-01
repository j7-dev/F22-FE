/**
 * 不用帶參數
 * 取得當前用戶資料
 * 判斷是否存在deposit_bonus
 * 返回當時選擇的deposit_bonus類型=>用來禁用存款條件 number | null
 * 返回允許的遊戲類型=>用來禁用可遊玩的遊戲分類 string[] | null
 */
import { useGetIdentity } from '@refinedev/core';
import { TMe } from '@/types';

export const useGetDepositBonus = () => {
    const { data: identity } = useGetIdentity<TMe>();
    // const [depositBonus, setDepositBonus] = useState<number | null>(null);
    // const [allowGameCategories, setAllowGameCategories] = useState<string[] | null>(null);

    if (identity?.last_deposit?.deposit_bonus) {
        return {
            depositBonus: identity?.last_deposit?.deposit_bonus?.id,
            allowGameCategories: identity?.last_deposit?.deposit_bonus?.allow_game_categories,
        };
    }
    return { depositBonus: null, allowGameCategories: null };
};
