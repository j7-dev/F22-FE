import { API_URL } from '@/utils';

const index = ({ img }: { img: any }) => {
    return <img className="w-20 h-20 object-contain" src={`${API_URL}${img?.formats?.small?.url}`} />;
};

export default index;
