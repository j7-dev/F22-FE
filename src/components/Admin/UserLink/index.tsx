import React from 'react';
import { TUser } from '@/types';
import { Link } from 'react-router-dom';

const index: React.FC<{ user?: TUser; role?: 'agent' | 'authenticated' }> = ({ user, role = 'authenticated' }) => {
    const display_name = user?.display_name || user?.username || user?.email || user?.id;
    const slug = role === 'authenticated' ? 'members' : 'agent';
    if (user) {
        return (
            <Link to={`/refine/${slug}/show/${user?.id}`}>
                {user?.username} / {display_name}
            </Link>
        );
    }

    return null;
};

export default index;
