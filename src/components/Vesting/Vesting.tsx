import './vesting.scss';
import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { Address } from 'wagmi';

import { formatDate, prettierNumber } from '@/utils';
import { CardState, cardStateAtom } from '@/atoms/atoms';
import useVesting from '@/hooks/useVesting';
import useUserContract from '@/hooks/useUserContract';
import useTx from '@/hooks/useTx';

import Loader from './Loader.svg';
import Card from '../Card';

type LoadingButtonProps = {
  isLoading: boolean;
  title: string;
  onClick: () => void;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, title, onClick }) => {
  if (!isLoading) {
    return <button onClick={onClick}>{title}</button>;
  }

  return (
    <button className="loading">
      <svg
        className="svg-icon"
        style={{
          width: '1em',
          height: '1em',
          verticalAlign: 'middle',
          fill: 'currentColor',
          overflow: 'hidden',
        }}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512.511 21.483c-271.163 0-491.028 219.86-491.028 491.028 0 271.173 219.856 491.03 491.028 491.03 26.554 0 48.08-21.527 48.08-48.08 0-26.554-21.526-48.08-48.08-48.08-218.065 0-394.869-176.804-394.869-394.87 0-218.06 176.813-394.869 394.87-394.869 218.065 0 394.869 176.804 394.869 394.87 0 26.553 21.526 48.08 48.08 48.08 26.553 0 48.08-21.527 48.08-48.08 0-271.173-219.857-491.03-491.03-491.03z" />
      </svg>
    </button>
  );
};

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="item">
      <h3 className="title">{title}</h3>
      <div className="value">{value}</div>
    </div>
  );
};

type LoadErrorHandlerProps = {
  error: string | null;
  isLoading: boolean;
  children: React.ReactNode;
};

const LoadErrorHandler: React.FC<LoadErrorHandlerProps> = ({ error, isLoading, children }) => {
  const setCardState = useSetAtom(cardStateAtom);
  useEffect(() => {
    switch (true) {
      case isLoading:
        setCardState(CardState.Loading);
        break;
      case error !== null:
        setCardState(CardState.Error);
        break;
      default:
        setCardState(CardState.Success);
        break;
    }
  }, [error, isLoading, setCardState]);

  if (!isLoading && error === null) {
    return children;
  }

  return (
    <Card>
      {isLoading ? <div className="loading">Loading...</div> : <div className="error">{error}</div>}
    </Card>
  );
};

const VestingCard: React.FC<{ contract: Address; user: Address }> = ({ contract, user }) => {
  const { isLoading, error, claimable, claimed, cliff, duration, start, total, accepted, revoked } =
    useVesting(contract, user);
  const { claim, accept, isLoading: txLoading } = useTx(contract, user);

  return (
    <LoadErrorHandler error={error} isLoading={isLoading}>
      <Card>
        <div className="vesting-infos">
          <Item title="Total" value={prettierNumber(total) + ' GEM'} />
          <Item title="Available" value={prettierNumber(claimable) + ' GEM'} />
          <Item title="Already Claimed" value={prettierNumber(claimed) + ' GEM'} />
          <Item title="Start Date" value={formatDate(start)} />
          <Item title="Cliff End Date" value={formatDate(start + cliff)} />
          <Item title="End Date" value={formatDate(start + duration)} />
        </div>
        <div className="actions">
          {revoked ? (
            <button className="disabled">Vesting Revoked</button>
          ) : accepted ? (
            <LoadingButton
              title={`Claim ${prettierNumber(claimable)} GEM`}
              isLoading={txLoading}
              onClick={claim}
            />
          ) : (
            <button onClick={accept} disabled={txLoading}>
              Accept Vesting
            </button>
          )}
        </div>
      </Card>
    </LoadErrorHandler>
  );
};

interface VestingProps {
  user: Address;
}

const Vesting: React.FC<VestingProps> = ({ user }) => {
  const { error, isLoading, contracts } = useUserContract(user);

  return (
    <LoadErrorHandler error={error} isLoading={isLoading}>
      {contracts.map((contract) => (
        <VestingCard key={contract} contract={contract} user={user} />
      ))}
    </LoadErrorHandler>
  );
};

export default Vesting;
