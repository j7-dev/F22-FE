import { useGetIdentity } from '@refinedev/core';
import { useSetAtom } from 'jotai';
import { TGame } from '@/types/games';
import { signInAtom } from '@/components/ContentLayout/Header/LoginModule';
import { TMe } from '@/types';
import { useEvoOpenGame } from './evolution/useEvoOpenGame';
import { usePpOpenGame } from './pragmatic/usePpOpenGame';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

export const useOpenGame = () => {
    const { data: identity } = useGetIdentity<TMe>();
    const { handleClick: handleClickEvo, isLoading: evoLoading } = useEvoOpenGame();
    const { handleClick: handleClickPp, isLoading: ppLoading } = usePpOpenGame();
    const navigate = useNavigate();
    const setSignIn = useSetAtom(signInAtom);
    const isLoading = evoLoading || ppLoading;
    const handleClick = (item: TGame) => () => {
        if (!identity) {
            setSignIn(true);
            return;
        }

        if (item.gameProviderName === 'evolution') {
            handleClickEvo({ item, identity });
        } else if (item.gameProviderName === 'pragmaticPlay') {
            handleClickPp({ item, identity });
        } else if (item.gameProviderName === 'sports') {
            navigate(`/sports`);
        } else if (item.gameProviderName === 'inPlay') {
            navigate(`/inPlay`);
        } else if (item.gameProviderName === 'golf') {
            navigate(`/golf`);
        } else {
            notification.error({ message: 'Error', description: 'Game not found' });
        }
    };
    return { isLoading, handleClick };
};
