type HasVesting = {
  hasVesting: true;
  start: number;
  duration: number;
  cliff: number;
  total: bigint;
  claimed: bigint;
  claimable: bigint;
};

export type Vesting = {
  user: `0x${string}`;
} & (HasVesting | { hasVesting: false });
