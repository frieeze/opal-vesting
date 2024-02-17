import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

import { CardState, cardStateAtom } from '@/atoms/atoms';

import Vesting from './Vesting';
import Card from './Card';

const Login: React.FC = () => {
  const { address } = useAccount();
  const setState = useSetAtom(cardStateAtom);
  useEffect(() => {
    setState(CardState.Loading);
  }, [setState, address]);
  if (address) {
    return <Vesting user={address} />;
  }
  return (
    <Card>
      <h2 className="card__title">Opal Vesting</h2>
      <p className="text-center">Connect a wallet to continue</p>
      <ConnectKitButton />
    </Card>
  );
};

export default Login;
