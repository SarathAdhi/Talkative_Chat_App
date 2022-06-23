import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { LinkedItem } from "../elements/LinkedItem";

export const Tabs = ({ filteredRoomDetails, user }) => {
  return (
    <Tab.Group>
      <Tab.List className="flex rounded-xl bg-blue-800 p-1">
        {["Users", "Rooms"].map((name) => (
          <Tab
            key={name}
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg py-2.5 text-sm font-medium text-blue-700 focus:outline-none",
                selected ? "bg-white shadow" : "text-blue-100 hover:text-white"
              )
            }
          >
            {name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="overflow-y-auto flex flex-col gap-4 mt-2">
        <Tab.Panel className="flex flex-col gap-2">
          {user.friends?.length !== 0 ? user.friends.map((friend, index) => (
            <LinkedItem
              key={index}
              className="bg-[#d7cbff] flex flex-col rounded-lg text-xl font-semibold text-black px-2 py-2 duration-300 group hover:bg-[#be96ff]"
              href={`/chat/${friend.chatId}?hashName=${friend.hashName}`}
            >
              {friend.hashName}
            </LinkedItem>
          )): <p className="bg-white px-2 py-1 text-black rounded-lg">No Users...</p>}
        </Tab.Panel>
        <Tab.Panel className="flex flex-col gap-2">
          {filteredRoomDetails.length !== 0 ? (
            filteredRoomDetails.map((room, index) => (
              <LinkedItem
                key={index}
                className="bg-[#d7cbff] flex flex-col rounded-lg text-xl font-semibold text-black px-2 py-2 duration-300 group hover:bg-[#be96ff]"
                href={`/room/${room.roomId}/#bottom`}
              >
                {room.roomId}
                {room.messages.length !== 0 && (
                  <p className="h-5 mt-1 text-sm font-normal overflow-hidden text-black duration-300 pl-1 rounded-md">
                    {room.messages?.[room.messages.length - 1]?.name}
                    {" : "}
                    <em>
                      {room.messages?.[room.messages.length - 1]?.message}
                    </em>
                  </p>
                )}
              </LinkedItem>
            ))
          ) : (
            <p className="bg-white px-2 py-1 text-black rounded-lg">No Rooms...</p>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
