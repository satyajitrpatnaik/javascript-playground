import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { getAccessManagerApiEndpoint } from "app/utils/constants/endpoints";

const httpLinkOptions =
  process.env.NODE_ENV === "development"
    ? { uri: getAccessManagerApiEndpoint() }
    : { uri: getAccessManagerApiEndpoint(), credentials: "include" };

export const link = createHttpLink(httpLinkOptions);

export const Client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Privileges: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          Roles: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          Apps: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          Sites: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
