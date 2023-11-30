import { ConnectKitProvider } from 'connectkit';

import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/libs/web3';

import Header from './components/Header';
import Login from './components/Login';

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <Header />
        <div className="container">
          <Login />
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
