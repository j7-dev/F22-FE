import React from 'react';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import GameList from '@/components/ContentLayout/GameList';

const index: React.FC = () => {
    const { data, isLoading } = useGetPPTableList();
    // console.log('🚀  data:', data);
    if (isLoading) return <div>loading...</div>;
    return (
        <div className="pragmaticGamesContain sm:py-4">
            <GameList gameData={data} />
        </div>
    );
};
export default index;
