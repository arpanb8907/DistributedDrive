import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  
  { name: "My files", href: "#", current: true },
  { name: "Shared with me", href: "#", current: false },
  { name: "History", href: "#", current: false },
  { name: "settings", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Left Logo & Brand Name */}
          {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a
              href="/"
              className="flex items-center gap-2 shrink-0 text-white hover:text-indigo-300 transition-colors"
            >
              <BoltIcon className="h-6 w-6 text-indigo-400 animate-pulse" />
              <span className="text-lg font-bold tracking-wide">D-Drive</span>
            </a>
          </div> */}

          {/* Navigation Links */}
          <div className="flex flex-1 items-center justify-start space-x-8 sm:items-stretch">
            <a
              href="/"
              className="flex items-center gap-2 shrink-0 text-white hover:text-indigo-300 transition-colors"
            >
              <BoltIcon className="h-6 w-6 text-indigo-400 animate-pulse" />
              <span className="text-lg font-bold tracking-wide">D-Drive</span>
            </a>

            {/* Navigation Links */}
            <div className="hidden sm:flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Settings
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Sign out
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
