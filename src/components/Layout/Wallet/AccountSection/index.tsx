import React from 'react';
import RolloverHistory from './RolloverHistory';
import CashHistory from './CashHistory';
import ChangePassword from './ChangePassword';

interface AccountSectionProps {
    section?: string;
}
const index: React.FC<AccountSectionProps> = (props) => {
    if (props.section === 'RolloverHistory') return <RolloverHistory />;
    if (props.section === 'CashHistory') return <CashHistory />;
    if (props.section === 'ChangePassword') return <ChangePassword />;
    return <></>;
};

export default index;
