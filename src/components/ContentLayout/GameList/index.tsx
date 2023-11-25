import React from 'react';
import { TGame } from '@/types/games';
import SingleGame from './SingleGame';
import { Empty } from 'antd';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRwd } from '@/hooks/useRwd';
import underConstructionIcon from '@/assets/images/game_provider/Under_construction.svg';
import { useTranslation } from 'react-i18next';
// import { useExportCsv } from '@/hooks/useExportCsv';

type TGameListProp = {
    gameData?: TGame[];
    gridColumnCount?: number;
};
type TCell = {
    columnIndex: number;
    rowIndex: number;
    style: {
        [key: string]: string | number;
    };
};

const index: React.FC<TGameListProp> = React.memo(({ gameData = [], gridColumnCount = 4 }) => {
    // const { handleDownload } = useExportCsv();
    const { t } = useTranslation();
    const { isLg, isMd } = useRwd();
    if (gameData.length === 0)
        return (
            <Empty
                className="flex flex-col items-center "
                image={null}
                imageStyle={{ height: 0 }}
                description={
                    <>
                        <img src={underConstructionIcon} className={`${isMd ? 'w-[360px]' : 'w-[240px]'} h-auto`} alt="" />
                        <div className="md:text-4xl text-base font-bold text-[#5932EA]">{t("We're under construction.")}</div>
                        <div className="md:text-base text-xs font-medium text-[#828282]">{t('We need a few time to make everything perfect.Please check back later.')}</div>
                    </>
                }
            />
        );

    const columnCount = isLg ? gridColumnCount : isMd ? 3 : 2;

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
        <div className="gameList grid md:grid-cols-11 px-4 md:p-0 md:mx-0 w-full">
            {/* <button onClick={handleDownload({ gameData })}>Export Button</button> */}
            <div className="col-span-9 md:col-start-2 grid h-screen md:-mx-2">
                <AutoSizer className="autoSizerWrap">
                    {({ height, width }: { height: number; width: number }) => {
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
        </div>
    );
});

export default index;
