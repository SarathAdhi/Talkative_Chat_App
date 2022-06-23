import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import { onSnapshot } from "firebase/firestore";
import {
  chatCollectionRef,
  roomCollectionRef,
  userCollectionRef,
} from "../lib/firebase";
import { useSession } from "next-auth/react";

export const AllStateManagerWrapper = ({ children }) => {
  const { _userRooms } = useContext(Context);
  const [userRoom, setUserRoom] = _userRooms;

  const { _userChats } = useContext(Context);
  const [userChatDetails, setUserChatDetails] = _userChats;

  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // setUserData(session.user);
      onSnapshot(userCollectionRef, (data) => {
        const result = data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        const filter = result.filter((item) => {
          return item.email === session.user.email;
        });
        setUserData(...filter);
      });
    }
    if (status === "unauthenticated") setUserData("");

    onSnapshot(roomCollectionRef, (data) => {
      const result = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      const filter = result.filter((item) => {
        return item.members.find(
          (member) => member.email === session?.user.email
        );
      });
      setUserRoom(filter);
    });

  }, [status]);

  return <>{children}</>;
};
