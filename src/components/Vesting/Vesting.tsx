import './vesting.scss';
import React from 'react';

import useVesting from '@/hooks/useVesting';
import { formatDate, prettierNumber } from '@/utils';
import { useAtomValue } from 'jotai';
import { error } from '@/atoms/atoms';
import { Address } from 'wagmi';

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="item">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
};

const Loading = () => {
  return <div className="loading">Loading...</div>;
};

const Error = ({ message }: { message: string }) => {
  return <div className="error">{message}</div>;
};

interface VestingProps {
  user: Address;
}

const Vesting: React.FC<VestingProps> = ({ user }) => {
  const { isLoading, vesting } = useVesting(user);
  const errMessage = useAtomValue(error);

  const colorClass = (() => {
    if (isLoading) return 'info';
    if (errMessage || !vesting.hasVesting) return 'error';
    return '';
  })();

  return (
    <div className={`card ${colorClass}`}>
      <div className="card-body">
        <div className="vesting">
          {isLoading ? (
            <Loading />
          ) : errMessage || !vesting.hasVesting ? (
            <Error message={errMessage ?? 'User vesting not found'} />
          ) : (
            <>
              <Item title="Total" value={prettierNumber(vesting.total)} />
              <Item title="Available" value={prettierNumber(vesting.claimable)} />
              <Item title="Already Claimed" value={prettierNumber(vesting.claimed)} />
              <Item title="Start Date" value={formatDate(vesting.start)} />
              <Item title="Cliff End Date" value={formatDate(vesting.start + vesting.cliff)} />
              <Item title="End Date" value={formatDate(vesting.start + vesting.duration)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vesting;
