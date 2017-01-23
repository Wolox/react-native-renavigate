import React from 'react';
import { RootSceneContainer } from 'react-native-renavigate';

import routeDefs from './routes';

export default function index() {
  return (
    <RootSceneContainer
      initialRoute={routeDefs.LIST()}
      routeDefs={routeDefs}
    />
  );
}
