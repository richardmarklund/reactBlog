import { createContext,useState, useContext } from 'react';

const PostContext = createContext([]);

export const PostProvider = ({ children }) => {
  return (
    <PostContext.Provider value={useState([])}>
      {children}
    </PostContext.Provider>
  );
}

export const useItems = () => useContext(PostContext);