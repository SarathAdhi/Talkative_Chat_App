import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import { onValue, ref } from "firebase/database";
import { dbDatabase } from "../lib/firebase";

export const ConditionalWrapper = ({ children }) => {
  const { _userRooms } = useContext(Context);
  const [userRoom, setUserRoom] = _userRooms;

  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  useEffect(() => {
    const roomsRef = ref(dbDatabase, "rooms");

    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const result = Object.values(data);
        const filteredData = result.filter(
          ({ adminEmail }) => adminEmail === userData.email
        );
        setUserRoom(filteredData);
      }
    });
  }, [userData]);

  return <>{children}</>;
};
