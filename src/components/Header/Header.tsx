import './header.scss';
import React from 'react';

import { ConnectKitButton } from 'connectkit';

const Header: React.FC = () => {
  return (
    <header>
      <ConnectKitButton />
    </header>
  );
};

export default Header;
