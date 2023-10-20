import { TGame } from '@/types/games';
import SingleGame from '@/components/ContentLayout/GameList/SingleGame';
import { Empty } from 'antd';
import { nanoid } from 'nanoid';

const index = ({ gameData }: { gameData: TGame[] }) => {
    if (gameData.length === 0) return <Empty description={<span>Data Not Found</span>}></Empty>;
    return (
        <div className="gameList grid sm:grid-cols-11 sm:px-0 px-4">
            <div className="col-span-9 col-start-2 h-fit sm:-mx-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {gameData.map((item) => {
                    return <SingleGame key={nanoid()} gameItem={item} />;
                })}
            </div>
        </div>
    );
};

export default index;
