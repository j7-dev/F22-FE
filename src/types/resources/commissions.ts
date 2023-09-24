import { TUser, BaseType, AmountType } from '@/types';

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

export type TCommissionFields = Omit<AmountType, 'amount'> & {
    label: string;
    description?: string;
    type: TCommissionType;
    formula?: TCommissionFormula[];
    enabled: boolean;
    agents?: TUser[];
};
