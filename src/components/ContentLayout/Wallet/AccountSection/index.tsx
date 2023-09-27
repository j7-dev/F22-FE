import React from 'react';
import RolloverHistory from './RolloverHistory';
import CashHistory from './CashHistory';
import ChangePassword from './ChangePassword';

interface AccountSectionProps {
    section?: string;
}
const index: React.FC<AccountSectionProps> = (props) => {
    if (props.section === 'rolloverHistory') return <RolloverHistory />;
    if (props.section === 'cashHistory') return <CashHistory />;
    if (props.section === 'changePassword') return <ChangePassword />;
    return <></>;
};

export default index;
