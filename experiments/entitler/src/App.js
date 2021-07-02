import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@material-ui/styles";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "app/assets/styles/custom-ag-grid-styles.css";

import Layout from "app/views/layout/Layout";
import DefaultTheme from "app/utils/themes/DefaultTheme";
import { Client } from "app/gql/Client";
import { LoadingMessage } from "app/views/shared/components/LoadingMessage";

function App() {
  return (
    <React.Suspense fallback={<LoadingMessage />}>
      <ApolloProvider client={Client}>
        <ThemeProvider theme={DefaultTheme}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Layout />
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </React.Suspense>
  );
}

export default App;
