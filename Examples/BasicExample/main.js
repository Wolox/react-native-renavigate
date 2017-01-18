import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import App from './src/App';

export default function main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
