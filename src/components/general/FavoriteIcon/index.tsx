import { Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSetFavorite } from '@/hooks/useSetFavorite';
import { TGame } from '@/types/games';
import { MouseEvent } from 'react';

const index = ({ item }: { item: TGame }) => {
    //取得收藏遊戲方法
    const { isLoading, handleClick: setFavorite, isFavorite } = useSetFavorite(item);

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        setFavorite(!isFavorite);
    };

    return <Button size="small" onClick={handleClick} ghost shape="circle" type="primary" icon={isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined className="text-white" />} className="bg-[#00000080] border-none" loading={isLoading} />;
};

export default index;
