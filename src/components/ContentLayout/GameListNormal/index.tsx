import { TGame } from '@/types/games';
import { useTranslation } from 'react-i18next';
import SingleGame from '@/components/ContentLayout/GameList/SingleGame';
import { Empty } from 'antd';
import { nanoid } from 'nanoid';
import underConstructionIcon from '@/assets/images/game_provider/Under_construction.svg';
import { useShowPc } from '@/hooks/useShowPc';

const index = ({ gameData }: { gameData: TGame[] }) => {
    const isPc = useShowPc();
    const { t } = useTranslation();
    if (gameData?.length === 0)
        return (
            <Empty
                className="flex flex-col items-center "
                image={null}
                imageStyle={{ height: 0 }}
                description={
                    <>
                        <img src={underConstructionIcon} className={`${isPc ? 'w-[360px]' : 'w-[240px]'} h-auto`} alt="" />
                        <div className="md:text-4xl text-base font-bold text-[#5932EA]">{t("We're under construction.")}</div>
                        <div className="md:text-base text-xs font-medium text-[#828282]">{t('We need a few time to make everything perfect.Please check back later.')}</div>
                    </>
                }
            />
        );
    return (
        <div className="gameList grid md:grid-cols-11 md:px-0 p-4 md:pt-0">
            <div className="col-span-9 md:col-start-2 h-fit grid grid-cols-2 gap-4 md:grid-cols-4">
                {gameData?.map((item) => {
                    return <SingleGame key={nanoid()} gameItem={item} />;
                })}
            </div>
        </div>
    );
};

export default index;
