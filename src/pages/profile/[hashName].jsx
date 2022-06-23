import React, { useContext, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { H2, H3 } from "../../common/components/elements/Text";
import { PageLayout } from "../../common/layouts/PageLayout";
import { userCollectionRef } from "../../lib/firebase";
import { Context } from "../../common/context/Context";
import { useRouter } from "next/router";
import Axios from "../../lib/axios";
import { showErrorsToast } from "../../utils/Toast";

const UserProfile = ({ user }) => {
  const router = useRouter();

  if (!user) {
    showErrorsToast({ title: "User doesn't exist" });
    setTimeout(() => router.replace("/"), 2000);
    return;
  }

  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const [isUsersFriend, setIsUsersFriend] = useState(false);
  const [isSentFriendRequest, setIsSentFriendRequest] = useState(false);

  async function sendFriendRequest() {
    await Axios.post("/request", {
      MyEmail: userData.email,
      MyHashName: userData.hashName,
      MyId: userData.id,
      UserEmail: user.email,
      UserHashName: user.hashName,
    });

    router.back();
  }

  // console.log(user);

  async function isFriend() {
    const userList = await user.friends.filter((frnd) => {
      return frnd.email === userData.email;
    });

    if (userList.length === 0) setIsUsersFriend(false);
    else {
      const myList = await userData.friends.filter((frnd) => {
        return frnd.email === user.email;
      });

      if (myList.length === 0) {
        setIsSentFriendRequest(true);
        setIsUsersFriend(true);
      } else {
        setIsUsersFriend(true);
        setIsSentFriendRequest(false);
      }
    }
  }

  isFriend();

  async function acceptFriendRequest(hashName, handle) {
    await Axios.post("/request/handle", {
      userHashName: hashName,
      myHashName: userData.hashName,
      myEmail: userData.email,
      myId: userData.id,
      handle,
    });

    router.replace(`/profile/${user.hashName}`);
  }

  return (
    <PageLayout title={user.hashName}>
      <div className="flex flex-col items-center gap-2 mt-10">
        <img
          className="w-40 rounded-full"
          src={user.image}
          referrerPolicy="no-referrer"
        />
        <H2>{user.name}</H2>
        <H3>{user.email}</H3>
        <H3>{user.hashName}</H3>
        {!isUsersFriend && (
          <button
            className="mt-8 p-2 rounded-lg bg-green-700"
            onClick={sendFriendRequest}
          >
            Send Request
          </button>
        )}
        {isSentFriendRequest && (
          <div className="flex gap-5 mt-5">
            <button
              className="bg-green-700 px-2 py-1 rounded-lg"
              onClick={() => acceptFriendRequest(user.hashName, "ACCEPT")}
            >
              Accept
            </button>
            <button
              className="bg-red-700 px-2 py-1 rounded-lg"
              onClick={() => acceptFriendRequest(user.hashName, "REJECT")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { hashName } = context.query;

  const _query = query(
    userCollectionRef,
    where("hashName", "==", `${hashName}`)
  );
  const querySnapshot = await getDocs(_query);
  const user = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  if (user.length === 0) {
    return {
      props: {
        user: "",
      },
    };
  }

  return {
    props: {
      user: user[0],
    },
  };
}
