import { useReadContracts } from 'wagmi';
import { Address } from 'viem';

import vestingABI from '@/abi/vesting';

const calls = [
  'beneficiaries',
  'start',
  'duration',
  'cliff',
  'lockedAmount',
  'totalReleasedAmount',
  'releasableAmount',
  'accepted',
  'revoked',
];


type UseVesting = (contract: Address, user: Address) => {
  isLoading: boolean,
  error: string | null,
  start: number;
  duration: number;
  cliff: number;
  total: bigint;
  claimed: bigint;
  claimable: bigint;
  accepted: boolean;
  revoked: boolean;
  refetch: () => void;
}

const useVesting: UseVesting = (contract: Address, user: Address) => {
  const { data, isError, isLoading, refetch } = useReadContracts({
    contracts: calls.map((fn) => ({
      address: contract,
      abi: vestingABI,
      functionName: fn,
      args: [user],
    })),
  });


  const hasVesting = (data?.[0]?.result as unknown as boolean) ?? false;
  function setError(): string | null {
    if (isLoading) {
      return null;
    }
    if (isError) {
      return 'Unable to fetch vesting information';

    }
    for (const res of data ?? []) {
      if (res.error) {
        return 'Unable to fetch vesting information';
      }
    }

    if (!hasVesting) {
      return `No vesting for this address on ${contract}`;
    }

    return null
  }

  const error = setError();

  const vesting = (() => {
    const novest = {
      start: 0,
      duration: 0,
      cliff: 0,
      total: 0n,
      claimed: 0n,
      claimable: 0n,
      accepted: false,
      revoked: false,
    }

    if (data === undefined || isError || isLoading) {
      return novest;
    }


    if (!hasVesting) {
      return novest;
    }
    return {
      start: Number(data[1]?.result ?? 0),
      duration: Number(data[2]?.result ?? 0),
      cliff: Number(data[3]?.result ?? 0),
      total: (data[4]?.result as unknown as bigint) ?? 0n,
      claimed: (data[5]?.result as unknown as bigint) ?? 0n,
      claimable: (data[6]?.result as unknown as bigint) ?? 0n,
      accepted: !!(data[7]?.result),
      revoked: !!(data[8]?.result),
    }
  })();

  return { ...vesting, isLoading, error, refetch };
};

export default useVesting;
