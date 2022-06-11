import React, { useContext, useState } from "react";
import { H4, H5 } from "../elements/Text";
import { Input } from "../elements/Input";
import { UserCircleIcon } from "@heroicons/react/outline";
import DropDownOptions from "../elements/DropDownOptions";
import { Context } from "../../context/Context";
import { options } from ".";
import { LinkedItem } from "../elements/LinkedItem";
import { DotsVerticalIcon } from "@heroicons/react/solid";

export const Sidebar = ({ userData }) => {
  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

  const [searchInputText, setSearchInputText] = useState("");

  // const { _user } = useContext(Context);
  // const [userData, setUserData] = _user;
  const user = userData;

  const filteredRoomDetails = userRoomDetails.filter((room) => {
    if (searchInputText === "") {
      return room;
    } else {
      return room.roomId.toLowerCase().includes(searchInputText);
    }
  });

  return (
    <div className="w-96 p-5 hidden lg:flex flex-col gap-y-5 bg-[#160040] rounded-l-lg border-r-[1px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <img
            className="w-10 h-10 rounded-full"
            src={user ? user.image : <UserCircleIcon />}
          />
          <H5>{user ? user.name : "User"}</H5>
        </div>

        <DropDownOptions
          options={options}
          Icon={<DotsVerticalIcon className="w-5" />}
        />
      </div>
      <Input
        type="text"
        placeholder="Search for users or rooms"
        onChange={(e) => setSearchInputText(e.target.value)}
      />
      <div className="overflow-y-auto flex flex-col gap-4 mt-2">
        {filteredRoomDetails.map((room, index) => (
          <LinkedItem
            key={index}
            className="bg-[#d7cbff] rounded-lg text-xl font-semibold text-black px-2 py-2"
            href={`/room/${room.roomId}`}
          >
            {room.roomId}
            {room.messages.length !== 0 && (
              <p className="h-5 text-sm font-normal overflow-hidden">
                {room.messages?.[room.messages.length - 1]?.name}
                {" : "}
                <em>{room.messages?.[room.messages.length - 1]?.message}</em>
              </p>
            )}
          </LinkedItem>
        ))}
      </div>
    </div>
  );
};
