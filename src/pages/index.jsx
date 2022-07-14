import { PageLayout } from "../common/layouts/PageLayout";
import { getSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { Context } from "../common/context/Context";
import { showSuccessToast } from "../utils/Toast";
import { useRouter } from "next/router";
import { showAlert } from "../utils/Alert";
import { H3 } from "../common/components/elements/Text";
import Axios from "../lib/axios";
import { LinkedItem } from "../common/components/elements/LinkedItem";

export default function Home({ userDataSSR }) {
  const router = useRouter();

  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const { _userRooms } = useContext(Context);

  async function showLoginStatusToast() {
    const data = router.query;
    if (data.msg) await showSuccessToast({ title: data.msg });
    await router.replace("/");
  }

  useEffect(() => {
    showLoginStatusToast();
    if (userDataSSR.hashName === "") {
      showAlert({
        title:
          "You need to create a new #tag for sending and receiving friend request.",
        handleFunction: async () => {
          await router.replace("/profile");
        },
      });
    }
  }, []);

  return (
    <PageLayout
      title="Home | Notification"
      className="gap-10 md:gap-2 p-5 md:!p-10"
    >
      {userData.notifications?.length !== 0 ? (
        userData.notifications?.map((notification, index) => (
          <div key={index} className="flex items-center gap-5 flex-wrap">
            <p className="flex items-center gap-2">
              <LinkedItem
                href={`/profile/${notification.hashName}`}
                className="text-sky-400"
              >
                {notification.hashName}
              </LinkedItem>
              {notification.tag}
            </p>
          </div>
        ))
      ) : (
        <H3>No notifications to read.</H3>
      )}
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
  const { data } = await Axios.post("/user", {
    token: process.env.API_TOKEN,
    email: session.user.email,
  });

  return {
    props: {
      userDataSSR: data.data[0],
    },
  };
}
