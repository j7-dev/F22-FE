import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const RowActionButton: React.FC<{ id: number }> = ({ id }) => {
    return (
        <div className="flex">
            <Link to={`/refine/members/show/${id}`}>
                <Button type="primary" size="small" shape="circle" icon={<EyeOutlined />} />
            </Link>
            <Link to={`/refine/members/edit/${id}`}>
                <Button className="ml-2" type="primary" size="small" shape="circle" icon={<EditOutlined />} />
            </Link>
        </div>
    );
};

export default RowActionButton;
