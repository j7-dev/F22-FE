import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

const RowActionButton: React.FC<{ id: number }> = ({ id }) => {
    return (
        <div className="flex">
            <Link to={`/refine/agent/edit/${id}`}>
                <Button className="ml-2" type="primary" size="small" shape="circle" icon={<EditOutlined />} />
            </Link>
        </div>
    );
};

export default RowActionButton;
