import React from 'react';
import { TVip } from '@/types';
import { Link } from 'react-router-dom';

const index: React.FC<{ vip?: TVip }> = ({ vip }) => {
    if (vip) {
        return <Link to="/refine/system-setting/vips">{vip?.label}</Link>;
    }
    return null;
};

export default index;
