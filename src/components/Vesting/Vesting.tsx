import './vesting.scss';
import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { Address } from 'viem';

import { formatDate, prettierNumber } from '@/utils';
import { CardState, cardStateAtom } from '@/atoms/atoms';
import useVesting from '@/hooks/useVesting';
import useUserContract from '@/hooks/useUserContract';
import useTx from '@/hooks/useTx';

import Card from '../Card';

const Spinner: React.FC<{ size?: string }> = ({ size = '1em' }) => (
  <svg
    className="loading__spinner"
    style={{
      width: size,
      height: size,
      verticalAlign: 'middle',
      fill: 'currentColor',
    }}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M512.511 21.483c-271.163 0-491.028 219.86-491.028 491.028 0 271.173 219.856 491.03 491.028 491.03 26.554 0 48.08-21.527 48.08-48.08 0-26.554-21.526-48.08-48.08-48.08-218.065 0-394.869-176.804-394.869-394.87 0-218.06 176.813-394.869 394.87-394.869 218.065 0 394.869 176.804 394.869 394.87 0 26.553 21.526 48.08 48.08 48.08 26.553 0 48.08-21.527 48.08-48.08 0-271.173-219.857-491.03-491.03-491.03z" />
  </svg>
);

type LoadingButtonProps = {
  isLoading: boolean;
  disabled?: boolean;
  title: string;
  onClick: () => void;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, disabled, title, onClick }) => {
  if (!isLoading) {
    return (
      <button className={disabled ? 'disabled' : ''} onClick={onClick}>
        {title}
      </button>
    );
  }

  return (
    <button className="loading">
      <Spinner size="1.2em" />
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
      {isLoading ? (
        <div className="loading">
          <Spinner size="2em" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="error">{error}</div>
      )}
    </Card>
  );
};

const VestingCard: React.FC<{ contract: Address; user: Address }> = ({ contract, user }) => {
  const {
    isLoading,
    error,
    claimable,
    claimed,
    cliff,
    duration,
    start,
    total,
    accepted,
    revoked,
    refetch,
  } = useVesting(contract, user);
  const { claim, accept, status } = useTx(contract, user);

  useEffect(() => {
    if (status === 'success') {
      refetch();
    }
  }, [refetch, status]);

  const txLoading = status === 'pending';

  const cliffNotPassed = (start + cliff) * 1000 > Date.now();
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
              title={
                cliffNotPassed ? 'Cliff period not over' : `Claim ${prettierNumber(claimable)} GEM`
              }
              isLoading={txLoading}
              disabled={claimable === 0n || cliffNotPassed}
              onClick={claim}
            />
          ) : (
            <LoadingButton title="Accept Vesting" isLoading={txLoading} onClick={accept} />
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
