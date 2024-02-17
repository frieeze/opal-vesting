import './header.scss';
import React from 'react';

import { ConnectKitButton } from 'connectkit';

const Header: React.FC = () => {
  return (
    <header>
      <a href="https://opaldefi.xyz" target="_blank" rel="noreferrer">
        <img src="/images/opal-logo.png" alt="Opal logo" />
      </a>
      <ConnectKitButton />
    </header>
  );
};

export default Header;
