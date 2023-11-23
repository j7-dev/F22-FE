import { useNavigate } from 'react-router-dom';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
import { useSetAtom } from 'jotai';
import { useCustomMutation } from '@refinedev/core';
import { API_URL } from '@/utils';

export const useChangePassword = () => {
    const { mutate, isLoading } = useCustomMutation();
    const Navigate = useNavigate();
    const setSignIn = useSetAtom(signInAtom);
    const changePassword = (values: { newPas: string; currentPassword: string; checkPas: string }) => {
        const { newPas, currentPassword, checkPas } = values;
        const payload = {
            currentPassword: currentPassword,
            password: newPas,
            passwordConfirmation: checkPas,
        };
        mutate(
            {
                url: `${API_URL}/api/auth/change-password`,
                method: 'post',
                values: payload,
                config: {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('API_TOKEN')}`,
                    },
                },
            },
            {
                onSuccess: () => {
                    // 成功後登出帳號清除localStorage並且開啟登入視窗
                    sessionStorage.removeItem('API_TOKEN');
                    Navigate('/');
                    setSignIn(true);
                },
            },
        );
    };
    return { changePassword, isLoading };
};
