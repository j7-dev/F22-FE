import { TItem } from '../BonusCards';
import { CheckOutlined } from '@ant-design/icons';

const index = ({ item, onClick, isActive }: { item: TItem; onClick: () => void; isActive: boolean }) => {
    return (
        <div className={`w-full relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer outline outline-2 outline-offset-4 hover:outline-primary ${isActive ? 'outline-primary' : 'outline-transparent'}`} onClick={onClick}>
            <img className="w-full h-full duration-500 hover:scale-125 object-center object-cover" src={item?.image} />

            <div className="absolute top-2 left-2 bg-primary text-white rounded-xl  px-2 py-1 text-xs font-bold">{item?.title}</div>
            {isActive && (
                <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex justify-center items-center">
                    <CheckOutlined className="text-white" />
                </div>
            )}
        </div>
    );
};

export default index;
