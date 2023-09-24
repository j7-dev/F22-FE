import React from 'react';
import { TUser } from '@/types';
import { Link } from 'react-router-dom';

const index: React.FC<{ user?: TUser }> = ({ user }) => {
    const display_name = user?.display_name;
    if (user) {
        // TODO Add link
        return <Link to="">{display_name}</Link>;
    }
    return null;
};

export default index;
