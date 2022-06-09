import React, { useContext } from "react";
import { H4, H5, P } from "../../common/components/elements/Text";
import { Input } from "./elements/Input";
import { getSession, signOut, useSession } from "next-auth/react";
import {
  LogoutIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import DropDownOptions from "./elements/DropDownOptions";
import { InputModal } from "../../utils/InputModal";
import axios from "axios";
import { Url } from "../../common/constants/Url";
import { Context } from "../context/Context";

const tabs = "";

const createRoom = async () => {
  await InputModal({
    title: "Create a room",
    input: "text",
    inputLabel: "Create a unique 6 digit room ID",
    inputPlaceholder: "Create a room ID",
    inputAttributes: {
      minlength: 5,
      maxlength: 6,
      autocapitalize: "off",
      autocorrect: "off",
    },
    handleFunction: async (roomId) => {
      if (roomId) {
        const { user } = await getSession();
        const response = await axios.post(`${Url}/room/create`, {
          email: user.email,
          roomId,
        });
        console.log(response.data.data);
      }
    },
  });
};

const options = [
  {
    name: "Create Room",
    Icon: PlusCircleIcon,
    onClick: () => {
      createRoom();
    },
    active: false,
  },
  {
    name: "Logout",
    Icon: LogoutIcon,
    onClick: () => signOut(),
    active: false,
  },
];

export const Sidebar = () => {
  const { data: session } = useSession();
  const { _createdRooms } = useContext(Context);

  const [createdRoom, setCreatedRoom] = _createdRooms;
  console.log(createdRoom);

  if (session) {
    return (
      <div className="w-96 p-5 flex flex-col gap-y-5 bg-[#160040] rounded-l-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src={session.user ? session.user.image : <UserCircleIcon />}
            />
            <H5>{session.user ? session.user.name : "User"}</H5>
          </div>

          <DropDownOptions options={options} />
        </div>
        <Input type="text" placeholder="Search for users or message" />
        <div className="overflow-y-auto ">
          {tabs &&
            [...Array(20)].map((_, index) => (
              <div key={index}>
                <H4>{tabs[0].name}</H4>
                <P>{tabs[0].message}</P>
              </div>
            ))}
        </div>
      </div>
    );
  } else return <></>;
};
