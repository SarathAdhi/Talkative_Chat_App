/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { H5 } from "./Text";

export default function DropDownOptions({ options }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <DotsVerticalIcon className="w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute -top-2.5 left-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-3 px-2 flex flex-col gap-5">
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  className="flex gap-1 text-black items-center justify-center"
                  onClick={option.onClick}
                >
                  <option.Icon className="h-6" />
                  <H5 className="text-black font-medium">{option.name}</H5>
                </button>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
