import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import { onSnapshot } from "firebase/firestore";
import { roomCollectionRef } from "../lib/firebase";
import { useSession } from "next-auth/react";

export const AllStateManagerWrapper = ({ children }) => {
  const { _userRooms } = useContext(Context);
  const [userRoom, setUserRoom] = _userRooms;

  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") setUserData(session.user);
    if (status === "unauthenticated") setUserData("");

    onSnapshot(roomCollectionRef, (data) => {
      const result = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      const filter = result.filter((item) => {
        return item.members.find((member) => member.email === userData.email);
      });
      setUserRoom(filter);
    });

    // const roomsRef = ref(dbDatabase);
    // onValue(roomsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     const result = Object.values(data);
    //     const filteredData = result.filter(
    //       ({ adminEmail }) => adminEmail === userData.email
    //     );
    //     setUserRoom(filteredData);
    //   }
    // });
  }, [userData, status]);

  return <>{children}</>;
};
