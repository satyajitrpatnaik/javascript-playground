import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import CakeContainer from './containers/CakeContainer';
import CakeWithHooksContainer from './containers/CakeWithHooksContainer';
import IceCreamContainer from './containers/IceCreamContainer';
import NewCakeContainer from './containers/NewCakeContainer';
import store from './store/store';
import ItemContainer from './containers/ItemContainer/ItemContainer';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ItemContainer cake/>
        <ItemContainer />
        <NewCakeContainer />
        <CakeContainer />
        <CakeWithHooksContainer />
        <IceCreamContainer />
      </div>
    </Provider>
  );
}

export default App;
