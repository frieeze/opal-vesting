import { ConnectKitProvider } from 'connectkit';

import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/libs/web3';

import Header from './components/Header';
import Login from './components/Login';

import ckTheme from '@/utils/connect-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="auto" mode="dark" customTheme={ckTheme}>
          <Header />
          <div className="container">
            <Login />
          </div>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
