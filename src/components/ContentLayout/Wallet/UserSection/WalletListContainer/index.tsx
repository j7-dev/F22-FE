import React from 'react';
import CashContainer from './CashContainer';
import RewardContainer from './RewardContainer';
import AccountContainer from './AccountContainer';

const WalletListContainer: React.FC = () => (
    <div className="walletListContainer">
        <CashContainer />
        <RewardContainer />
        <AccountContainer />
    </div>
);

export default WalletListContainer;
