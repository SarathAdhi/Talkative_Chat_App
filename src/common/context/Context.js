import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [userRoomDetails, setUserRoomDetails] = useState([]);
  const [userChatDetails, setUserChatDetails] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  return (
    <Context.Provider
      value={{
        _userRooms: [userRoomDetails, setUserRoomDetails],
        _userChats: [userChatDetails, setUserChatDetails],
        _user: [userData, setUserData],
        _isPageLoading: [isPageLoading, setIsPageLoading],
      }}
    >
      {children}
    </Context.Provider>
  );
};
