import React from "react";
import axios from "axios";
import { MockedUser } from "./MockedUser";

const UserContext = React.createContext();

const fetchUser = (userInfoEndpoint) => {
  if (process.env.NODE_ENV === "development") {
    return Promise.resolve({ data: MockedUser });
  }
  return axios.get(userInfoEndpoint, { withCredentials: true });
};

export function UserProvider({ userInfoEndpoint, children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    fetchUser(userInfoEndpoint)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        throw new Error(
          "The call to /users/me is failed. It could be that you are not connected to the network."
        );
      });
  }, [userInfoEndpoint]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentUser custoom hook must be used within UserProvider."
    );
  }
  return context;
}
