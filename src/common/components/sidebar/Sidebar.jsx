import React, { useContext, useState } from "react";
import { H5 } from "../elements/Text";
import { Input } from "../elements/Input";
import { UserCircleIcon } from "@heroicons/react/outline";
import DropDownOptions from "../elements/DropDownOptions";
import { Context } from "../../context/Context";
import { options } from ".";
import { LinkedItem } from "../elements/LinkedItem";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Tabs } from "./Tabs";

export const Sidebar = ({ userData }) => {
  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

  const [searchInputText, setSearchInputText] = useState("");

  const user = userData;

  const filteredRoomDetails = userRoomDetails.filter((room) => {
    if (searchInputText === "") {
      return room;
    } else {
      return room.roomId.toLowerCase().includes(searchInputText);
    }
  });

  // console.log(userData);

  return (
    <div className="w-96 p-5 hidden lg:flex flex-col gap-y-5 bg-[#160040] rounded-l-lg border-r-[1px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <img
            className="w-10 h-10 rounded-full"
            src={user ? user.image : <UserCircleIcon />}
            referrerPolicy="no-referrer"
          />
          <H5>{user?.hashName || user.name}</H5>
        </div>

        {userData.hashName !== "" && (
          <DropDownOptions
            options={options}
            Icon={<DotsVerticalIcon className="w-5" />}
          />
        )}
      </div>
      <Input
        type="text"
        placeholder="Search for users or rooms"
        onChange={(e) => setSearchInputText(e.target.value)}
      />

      <Tabs filteredRoomDetails={filteredRoomDetails} user={user} />
    </div>
  );
};
