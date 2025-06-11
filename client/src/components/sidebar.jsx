import React, { useState } from "react";
import {
  PlusCircleIcon,
  FolderIcon,
  StarIcon,
  UsersIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "My Drive", icon: FolderIcon },
  { label: "Starred", icon: StarIcon },
  { label: "Shared with me", icon: UsersIcon },
  { label: "Trash", icon: TrashIcon },
];

const Sidebar = () => {
  const [active, setActive] = useState("My Drive");

  return (
    <div className="p-5 bg-white/70 backdrop-blur-md shadow-md min-h-screen space-y-6 border-r border-gray-200" >
      {/* Upload Button */}
      <button
        onClick={() => document.getElementById("fileInput").click()}
        className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl shadow hover:shadow-lg transition duration-200 hover:from-indigo-600 hover:to-purple-700 cursor-pointer"
      >
        <PlusCircleIcon className="h-5 w-5" />
        <span className="font-semibold">Upload File</span>
      </button>
      <input id="fileInput" type="file" hidden onChange={() => {}} />

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <div
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all
                ${isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"}`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
