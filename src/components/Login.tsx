import React from 'react';

import Vesting from './Vesting';
import { useAccount } from 'wagmi';

import { ConnectKitButton } from 'connectkit';

const Login: React.FC = () => {
  const { address } = useAccount();
  return (
    <div className={`card info`}>
      <div className="card-body">
        {address ? (
          <Vesting user={address} />
        ) : (
          <>
            <p className="text-center">Connect a wallet to continue</p>
            <ConnectKitButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
