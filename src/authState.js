import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  authenticated: true,
  token: "",
});
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={useState({
        authenticated: true,
        token: "",
      })}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
