import React, { useContext } from "react";
import { H4, H5, P } from "../../common/components/elements/Text";
import { Input } from "./elements/Input";
import { getSession, signOut } from "next-auth/react";
import {
  LogoutIcon,
  PlusCircleIcon,
  UserAddIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import DropDownOptions from "./elements/DropDownOptions";
import { InputModal } from "../../utils/InputModal";
import axios from "axios";
import { Context } from "../context/Context";
import { isAuth } from "../ConditionalWrapper";
import { Url } from "../constants/Url";
import { showErrorsToast, showSuccessToast } from "../../utils/Toast";

const tabs = "";

const createRoom = async () => {
  await InputModal({
    title: "Create a room",
    input: "text",
    inputLabel: "Create a unique 6 digit room ID",
    inputPlaceholder: "Create a room ID",
    inputAttributes: {
      minlength: 6,
      maxlength: 7,
      autocapitalize: "off",
      autocorrect: "off",
    },
    handleFunction: async (roomId) => {
      if (roomId) {
        const { user } = await getSession();
        const response = await axios.post(Url + "/room/create", {
          name: user.name,
          email: user.email,
          roomId,
        });
        const { status } = await response.data;
        if (status === 400) {
          const { message } = await response.data;
          showErrorsToast({ title: message });
        } else {
          const { message } = await response.data;
          showSuccessToast({ title: message });
        }
      } else {
        showErrorsToast({ title: "Enter a room Id" });
      }
    },
  });
};

const joinRoom = async () => {
  await InputModal({
    title: "Join a room",
    input: "text",
    inputLabel: "Enter the room ID",
    inputPlaceholder: "Enter the room ID",
    inputAttributes: {
      minlength: 6,
      maxlength: 7,
      autocapitalize: "off",
      autocorrect: "off",
    },
    handleFunction: async (roomId) => {
      if (roomId) {
        const { user } = await getSession();
        const response = await axios.post(`${Url}/room/join`, {
          name: user.name,
          email: user.email,
          roomId,
        });
        const { status } = await response.data;
        if (status === 400) {
          const { message } = await response.data;
          showErrorsToast({ title: message });
        } else {
          const { message } = await response.data;
          showSuccessToast({ title: message });
        }
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
    name: "Join Room",
    Icon: UserAddIcon,
    onClick: () => {
      joinRoom();
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
  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

  const { _user } = useContext(Context);
  const [userData, setUserData] = _user;

  if (userData.length !== 0) {
    const user = userData;
    return (
      <div className="w-96 p-5 flex flex-col gap-y-5 bg-[#160040] rounded-l-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src={user ? user.image : <UserCircleIcon />}
            />
            <H5>{user ? user.name : "User"}</H5>
          </div>

          <DropDownOptions options={options} />
        </div>
        <Input type="text" placeholder="Search for users or message" />
        <div className="overflow-y-auto ">
          {userRoomDetails.map((room, index) => (
            <div key={index}>
              <H4>{room.roomId}</H4>
            </div>
          ))}
        </div>
      </div>
    );
  } else return <></>;
};
