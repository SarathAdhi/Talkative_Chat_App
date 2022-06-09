import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [createdRooms, setCreatedRooms] = useState([]);
  return (
    <Context.Provider
      value={{ _createdRooms: [createdRooms, setCreatedRooms] }}
    >
      {children}
    </Context.Provider>
  );
};
