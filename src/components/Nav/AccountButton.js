import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {useWallet} from 'use-wallet';
import WalletProviderModal from '../WalletProviderModal';

const AccountButton = ({text}) => {
  const {account} = useWallet();

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Connect Wallet';

  return (
    <div>
      {!account ? (
        <Button onClick={handleWalletProviderOpen} className="shinyButtonSecondary">
          {buttonText}
        </Button>
      ) : (
        <span>
          Connected
        </span>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
