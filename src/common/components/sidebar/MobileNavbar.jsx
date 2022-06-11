/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CubeIcon, UserCircleIcon, XIcon } from "@heroicons/react/outline";
import { options } from ".";
import { LinkedItem } from "../elements/LinkedItem";
import { Context } from "../../context/Context";
import { H4, H5 } from "../elements/Text";
import { Input } from "../elements/Input";

const ActionButtons = ({ onClick, Icon }) => (
  <button
    className="flex gap-1 text-black items-center justify-center"
    onClick={onClick}
  >
    <Icon className="h-6 text-black" />
  </button>
);

export default function MobileNavbar({ userData }) {
  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

  const user = userData;

  const createRoomOption = options[0];
  const joinRoomOption = options[1];
  const logOutOption = options[2];

  return (
    <Popover className="absolute top-0 left-0 h-full lg:hidden">
      <Popover.Button className="bg-[#712B75] pb-1 pr-1 rounded-full focus:outline-none">
        <CubeIcon className="w-6 text-white" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-50 top-0 transition transform origin-top-right lg:hidden"
        >
          <div className="w-60 flex flex-col rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="p-2 flex items-center justify-between">
              <Popover.Button
                id="closeBtn"
                className="text-gray-400 focus:outline-none"
              >
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
              <div className="flex items-center justify-center gap-4">
                <ActionButtons
                  onClick={createRoomOption.onClick}
                  Icon={createRoomOption.Icon}
                />
                <ActionButtons
                  onClick={joinRoomOption.onClick}
                  Icon={joinRoomOption.Icon}
                />
              </div>
            </div>
            <div className="p-2 flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user ? user.image : <UserCircleIcon />}
                />
                <H5 className="text-black">{user ? user.name : "User"}</H5>
              </div>

              <ActionButtons
                onClick={logOutOption.onClick}
                Icon={logOutOption.Icon}
              />
            </div>
            <div className="p-1">
              <Input type="text" placeholder="Search for users or rooms" />
            </div>

            <div className="px-2 py-4 overflow-y-auto flex flex-col gap-2">
              {userRoomDetails.length !== 0 ? (
                userRoomDetails.map((room, index) => (
                  <LinkedItem
                    key={index}
                    onClick={() => document.getElementById("closeBtn").click()}
                    className="bg-[#d7cbff] rounded-lg text-black px-2 py-2"
                    href={`/room/${room.roomId}`}
                  >
                    {room.roomId}
                  </LinkedItem>
                ))
              ) : (
                <H5 className="text-black">No Room created..</H5>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
