import { PageLayout } from "../common/layouts/PageLayout";
import { getSession } from "next-auth/react";
import { useEffect, useContext } from "react";

import { Context } from "../common/context/Context";
import Image from "next/image";
import { H3 } from "../common/components/elements/Text";

export default function Home() {
  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

  // useEffect(() => {
  //   // setUserData(user);
  // }, []);

  const displayUserInstruction = [
    {
      webImage: require("../assets/home/create-room.png"),
      mobileImage: require("../assets/home/create-room-cropped.png"),
      text: "Create multiple rooms.",
    },
    {
      webImage: require("../assets/home/join-room.png"),
      mobileImage: require("../assets/home/join-room-cropped.png"),
      text: "Join any rooms with room ID.",
    },
    {
      webImage: require("../assets/home/recording-details.png"),
      mobileImage: require("../assets/home/recording-details-cropped.png"),
      text: "Stop .",
    },
  ];

  return (
    <PageLayout className="justify-center items-center gap-10 md:gap-2 md:!px-10">
      {displayUserInstruction.map((instr, index) => (
        <div key={index}>
          <div className="hidden md:block">
            <Image
              width={1000}
              height={200}
              className="rounded-2xl"
              src={instr.webImage}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:hidden">
            <Image
              width={1000}
              height={200}
              className="rounded-2xl"
              src={instr.mobileImage}
            />
            <H3 className="text-center">{instr.text}</H3>
          </div>
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

  return {
    props: {},
  };
}
