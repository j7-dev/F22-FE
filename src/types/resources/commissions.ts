import { TUser, BaseType } from '@/types';

export const commissionTypes = ['WINLOSE'] as const;

type TCommissionType = (typeof commissionTypes)[number];

export type TCommissionFormula = {
    gt: number;
    ratio: number;
};

export type TCommission = BaseType & {
    label: string;
    description: string | null;
    type: TCommissionType;
    formula: TCommissionFormula[];
    enabled: boolean;
    currency: string;
    agents?: TUser[];
};
