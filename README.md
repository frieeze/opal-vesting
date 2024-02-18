# Opal Vesting

Small UI to accept and claim opal $GEM vesting.

## Deployment

### Env variables

At deployment make sure the following env variables are correctly set:

```
VITE_MAINNET_RPC

VITE_WALLET_CONNECT_ID
```

WalletConnect app ID can be created [here](https://cloud.walletconnect.com) (free)

### Vesting Contracts

To update the vesting contracts addresses, modify `VestingContracts` in `src/constants/index.ts`

> Note: `VestingContracts` must be an Array of Addresses
