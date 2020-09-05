import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import CakeContainer from './containers/CakeContainer';
import CakeWithHooksContainer from './containers/CakeWithHooksContainer.js/CakeWithHooksContainer';
import IceCreamContainer from './containers/IceCreamContainer/IceCreamContainer';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
        <CakeWithHooksContainer />
        <IceCreamContainer />
      </div>
    </Provider>
  );
}

export default App;
