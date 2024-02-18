import 'react-toastify/dist/ReactToastify.css';
import { ConnectKitProvider } from 'connectkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { wagmiConfig } from '@/libs/web3';

import Header from './components/Header';
import Login from './components/Login';

import ckTheme from '@/utils/connect-theme';

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
          <ToastContainer position="bottom-right" theme="dark" pauseOnFocusLoss={false} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
