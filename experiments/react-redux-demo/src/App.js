import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import CakeContainer from './containers/CakeContainer';
import CakeWithHooksContainer from './containers/CakeWithHooksContainer';
import IceCreamContainer from './containers/IceCreamContainer';
import NewCakeContainer from './containers/NewCakeContainer';
import ItemContainer from './containers/ItemContainer/ItemContainer';
import UserContainer from './containers/UserContainer/UserContainer';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserContainer />
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
