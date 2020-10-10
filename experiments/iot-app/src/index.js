import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { Provider } from "react-redux";
import Store from "./store";
import App from "./containers/App/App";

import styles from './styles.css';

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={Store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
}

render(App);

if (module.hot) {
  module.hot.accept("./containers/App/App", () => {
    const NextApp = require("./containers/App/App").default;
    render(NextApp);
  });
}
