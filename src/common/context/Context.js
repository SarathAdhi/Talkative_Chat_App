import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { isAuth } from "../ConditionalWrapper";
import { Url } from "../constants/Url";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [createdRooms, setCreatedRooms] = useState([]);
  const [userData, setUserData] = useState([]);

  return (
    <Context.Provider
      value={{
        _createdRooms: [createdRooms, setCreatedRooms],
        _user: [userData, setUserData],
      }}
    >
      {children}
    </Context.Provider>
  );
};
