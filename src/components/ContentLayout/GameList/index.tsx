import React from 'react';
import { TGame } from '@/types/games';
import SingleGame from './SingleGame';
import { Empty } from 'antd';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRwd } from '@/hooks/useRwd';

type TGameListProp = {
    gameData?: TGame[];
};
type TCell = {
    columnIndex: number;
    rowIndex: number;
    style: {
        [key: string]: string | number;
    };
};

const index: React.FC<TGameListProp> = React.memo(({ gameData = [] }) => {
    if (gameData.length === 0) return <Empty description={<span>Data Not Found</span>}></Empty>;

    const { isLg, isMd } = useRwd();

    const columnCount = isLg ? 4 : isMd ? 3 : 2;

    const Cell = ({ columnIndex, rowIndex, style }: TCell) => {
        const gameItem = gameData?.[rowIndex * columnCount + columnIndex];

        return (
            <div
                style={{
                    ...style,
                    padding: '0.5rem',
                }}
            >
                <SingleGame gameItem={gameItem} />
            </div>
        );
    };

    return (
        <div className="h-[800px] px-2">
            <AutoSizer>
                {({ height, width }) => {
                    const columnWidth = width / columnCount;
                    const rowCount = Math.ceil(gameData.length / columnCount);

                    return (
                        <Grid columnCount={columnCount} columnWidth={columnWidth} height={height} rowCount={rowCount} rowHeight={columnWidth} width={width}>
                            {Cell as any}
                        </Grid>
                    );
                }}
            </AutoSizer>
        </div>
    );
});

export default index;
