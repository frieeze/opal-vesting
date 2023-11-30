import '@rainbow-me/rainbowkit/styles.css';

import { WagmiConfig } from 'wagmi';
import { chains, wagmiConfig } from '@/libs/web3';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import Header from './components/Header';

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Header />
          <header className="App-header">
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </header>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
