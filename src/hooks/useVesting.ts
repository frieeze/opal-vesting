import React from 'react';

import { useContractReads } from 'wagmi';
import { Address, getAddress } from 'viem';

import { vestingContract } from '@/constants';
import vestingABI from '@/abi/vesting';
import { useSetAtom } from 'jotai';
import { error } from '@/atoms/atoms';
import { Vesting } from '@/types';

const calls = [
  'beneficiaries',
  'start',
  'duration',
  'cliff',
  'lockedAmount',
  'totalReleasedAmount',
  'releasableAmount',
];

const useVesting = (user: Address) => {
  const setError = useSetAtom(error);

  const { data, isError, isLoading, isSuccess } = useContractReads({
    contracts: calls.map((fn) => ({
      address: getAddress(vestingContract),
      abi: vestingABI,
      functionName: fn,
      args: [user],
    })),
  });

  React.useEffect(() => {
    if (isLoading) {
      setError(null);
      return;
    }
    if (isError) {
      setError('Unable to fetch vesting information');
      console.log('error', isError);
      console.log('data', data);
      return;
    }
    for (const res of data ?? []) {
      if (res.error) {
        console.error(res.error.message);
        setError('Unable to fetch vesting information');
        return;
      }
    }
    setError(null);
  }, [isError, isLoading, isSuccess, setError, data]);

  const vesting: Vesting = (() => {
    const novest = {
      user,
      hasVesting: false,
    } as const;
    if (data === undefined || isError || isLoading) {
      return novest;
    }

    const hasVesting = (data[0]?.result as boolean) ?? false;

    if (!hasVesting) {
      return novest;
    }

    const start = Number(data[1]?.result ?? 0);
    const duration = Number(data[2]?.result ?? 0);
    const cliff = Number(data[3]?.result ?? 0);
    const total = (data[4]?.result as bigint) ?? 0n;
    const claimed = (data[5]?.result as bigint) ?? 0n;
    const claimable = (data[6]?.result as bigint) ?? 0n;

    return {
      user,
      hasVesting,
      start,
      duration,
      cliff,
      total,
      claimed,
      claimable,
    };
  })();

  return { vesting, isLoading, isError };
};

export default useVesting;
