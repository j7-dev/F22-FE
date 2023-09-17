import { Button } from 'antd';
import { Link } from 'react-router-dom';

const CreateButton = () => {
    return (
        <Link to="/refine/members/create">
            <Button type="primary">Create</Button>
        </Link>
    );
};

export default CreateButton;
