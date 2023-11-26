import { useGetUserRoleType } from '@/hooks';

const index = ({ phone }: { phone: string }) => {
    const roleType = useGetUserRoleType();
    const randomPhone = (str: string) => {
        // 生成隨機的四位數字
        const randomDigits = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0');

        // 將輸入字串的最後四個字符替換為隨機數字
        const resultString = str.slice(0, -4) + randomDigits;

        return resultString;
    };

    return <>{roleType === 'admin' ? phone : randomPhone(phone)}</>;
};

export default index;
