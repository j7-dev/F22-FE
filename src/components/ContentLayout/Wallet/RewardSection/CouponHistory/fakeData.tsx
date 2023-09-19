// TODO 資料結構找時間補=首字不要大寫
export type Coupon = {
    CouponName: string;
    CouponAmount: string;
    ExpirationDate: string;
    DateofUse: string;
    Request: string;
    [key: string]: any;
};

export const CouponHistoryTitle = ['Coupon Name', 'Coupon Amount', 'Expiration Date', 'Date of Use', 'Request'];
export const fakeCouponHistory: Coupon[] = [
    {
        CouponName: 'First Bonus',
        CouponAmount: '100',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/08/05',
        Request: 'success',
    },
    {
        CouponName: 'Second Bonus',
        CouponAmount: '90',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/10/05',
        Request: 'success',
    },
    {
        CouponName: 'Third Bonus',
        CouponAmount: '80',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/11/05',
        Request: 'success',
    },
    {
        CouponName: 'Fourth Bonus',
        CouponAmount: '70',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/12/05',
        Request: 'error',
    },
    {
        CouponName: 'Fifth Bonus',
        CouponAmount: '60',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/12/05',
        Request: 'success',
    },
];
