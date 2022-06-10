import { PageLayout } from "../common/layouts/PageLayout";
import { showSuccessToast } from "../utils/Toast";
import { getSession } from "next-auth/react";
import { useEffect, useContext } from "react";

import { Context } from "../common/context/Context";
import axios from "axios";
import { Url } from "../common/constants/Url";

export default function Home({ user, userRooms }) {
  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

  useEffect(() => {
    setUserData(user);
    setUserRoomDetails(userRooms);
  }, []);

  return (
    <PageLayout>
      {userRoomDetails.map((data) => (
        <div key={data.roomId}>
          <h1>{data.roomId}</h1>
        </div>
      ))}
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }
  const response = await axios.post(Url + "/room", {
    email: session.user.email,
  });

  return {
    props: {
      user: session.user,
      userRooms: response.data,
    },
  };
}
