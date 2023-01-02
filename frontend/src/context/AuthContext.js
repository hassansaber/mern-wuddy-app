import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    // for when user sign up
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // when page refresh  or when app starts
  useEffect(() => {
    // checking storage for token
    // JWT in local storage is a json-string
    const user = JSON.parse(localStorage.getItem("user"));
    // user now is json-object

    // update context when storage have user
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []); // [] means hook runs once

  console.log("Auth Context :", state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
