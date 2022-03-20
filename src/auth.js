import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  authenticated: false,
  token: "",
});
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={useState({
        authenticated: false,
        token: "",
      })}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
