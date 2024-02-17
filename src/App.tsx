import { ConnectKitProvider } from 'connectkit';

import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/libs/web3';

import Header from './components/Header';
import Login from './components/Login';

import ccTheme from '@/utils/connect-theme';

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider theme="auto" mode="dark" customTheme={ccTheme}>
        <Header />
        <div className="container">
          <Login />
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
