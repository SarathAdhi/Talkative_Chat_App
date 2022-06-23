import {
  LogoutIcon,
  PlusCircleIcon,
  UserAddIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { InputModal } from "../../../utils/InputModal";
import Axios from "../../../lib/axios";
import { showErrorsToast, showSuccessToast } from "../../../utils/Toast";
import { getSession, signOut } from "next-auth/react";
import Router from "next/router";

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
        const response = await Axios.post("/room/create", {
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
        const response = await Axios.post("/room/join", {
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

export const options = [
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
    name: "Profile",
    Icon: UserIcon,
    onClick: () => {
      Router.push("/profile");
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
