import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(false);
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={useState(false)}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
