import { createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

import { MAINNET_RPC, WALLET_CONNECT_ID } from '@/constants/env';
import { webSocket } from 'viem';


export const wagmiConfig = createConfig(
    getDefaultConfig({
        chains: [mainnet],
        transports: {
            [mainnet.id]: webSocket(MAINNET_RPC),
        },
        walletConnectProjectId: WALLET_CONNECT_ID,
        appName: 'Opal vesting',
        appUrl: '/favicon.png',
    }),
);
