import React, { useState, useEffect, useContext } from "react";
import nookies from "nookies";

export const OAuthContext = React.createContext();

export const OAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUser = async () => {};

  const login = async (username, password) => {};

  useEffect(() => {}, []);

  const logout = () => {};

  return (
    <OAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
};

export const useOAuth = () => useContext(OAuthContext);
