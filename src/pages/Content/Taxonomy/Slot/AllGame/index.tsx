import React from 'react';
import { useGetPPTableList } from '@/hooks/gameProvider/pragmatic/useGetPPTableList';
import GameList from '@/components/ContentLayout/GameList';

const index: React.FC = () => {
    const { data: ppData, isLoading } = useGetPPTableList();
    const data = [...ppData];
    // console.log('🚀  data:', data);
    if (isLoading) return <div>loading...</div>;
    return (
        <div className="allGamesContain sm:py-4">
            <GameList gameData={data} />
        </div>
    );
};
export default index;
