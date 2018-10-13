// https://gist.github.com/tyscorp/24516f1fdb8974a637b075cc9167a690

import * as React from 'react';
import {Manager, BrowserManager} from '@shopify/react-network/manager';

const {Consumer, Provider} = React.createContext<Manager>(new BrowserManager());

interface Props {
  manager?: Manager;
  children: React.ReactNode;
}

function NetworkManagerProvider({manager, children}: Props) {
  return manager ? (
    <Provider value={manager}>{children}</Provider>
  ) : (
    <>{children}</>
  );
}

export {Consumer, NetworkManagerProvider as Provider};
