import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [userRoomDetails, setUserRoomDetails] = useState([]);

  return (
    <Context.Provider
      value={{
        _userRooms: [userRoomDetails, setUserRoomDetails],
        _user: [userData, setUserData],
      }}
    >
      {children}
    </Context.Provider>
  );
};
