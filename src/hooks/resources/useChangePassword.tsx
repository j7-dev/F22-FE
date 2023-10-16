import { useNavigate } from 'react-router-dom';
import { popupIsOpenAtom } from '@/components/ContentLayout/Header/LoginModule';
import { useSetAtom } from 'jotai';
import { useCustomMutation } from '@refinedev/core';
import { API_URL } from '@/utils';

export const useChangePassword = () => {
    const { mutate, isLoading } = useCustomMutation();
    const Navigate = useNavigate();
    const setPopupIsOpen = useSetAtom(popupIsOpenAtom);
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
                        Authorization: `Bearer ${localStorage.getItem('API_TOKEN')}`,
                    },
                },
            },
            {
                onSuccess: () => {
                    // 成功後登出帳號清除localStorage並且開啟登入視窗
                    localStorage.removeItem('API_TOKEN');
                    Navigate('/');
                    setPopupIsOpen(true);
                },
            },
        );
    };
    return { changePassword, isLoading };
};
