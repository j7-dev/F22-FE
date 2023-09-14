// TODO 資料結構找時間補=首字不要大寫
export type Coupon = {
    CouponCode: string;
    CouponName: string;
    CouponAmount: string;
    ExpirationDate: string;
    DateofUse: string;
    Request: string;
    [key: string]: any;
};

export const CouponHistoryTitle = ['Coupon Code', 'Coupon Name', 'Coupon Amount', 'Expiration Date', 'Date of Use', 'Request'];
export const fakeCouponHistory: Coupon[] = [
    {
        CouponCode: 'firstBonus',
        CouponName: 'First Bonus',
        CouponAmount: '100',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/08/05',
        Request: 'success',
    },
    {
        CouponCode: 'secondBonus',
        CouponName: 'Second Bonus',
        CouponAmount: '90',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/10/05',
        Request: 'success',
    },
    {
        CouponCode: 'thirdBonus',
        CouponName: 'Third Bonus',
        CouponAmount: '80',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/11/05',
        Request: 'success',
    },
    {
        CouponCode: 'fourthBonus',
        CouponName: 'Fourth Bonus',
        CouponAmount: '70',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/12/05',
        Request: 'error',
    },
    {
        CouponCode: 'fifthBonus',
        CouponName: 'Fifth Bonus',
        CouponAmount: '60',
        ExpirationDate: '2023/12/31',
        DateofUse: '2023/12/05',
        Request: 'success',
    },
];
