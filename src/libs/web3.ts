import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

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

const { connectors } = getDefaultWallets({
  appName: 'Opal vesting',
  projectId: WALLET_CONNECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, wagmiConfig };
