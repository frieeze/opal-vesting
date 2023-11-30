import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { MAINNET_RPC, WALLET_CONNECT_ID } from '@/constants/env';

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({ http: MAINNET_RPC }),
    }),
    publicProvider(),
  ],
);

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains,
    publicClient,
    walletConnectProjectId: WALLET_CONNECT_ID,
    appName: 'Opal vesting',
  }),
);
