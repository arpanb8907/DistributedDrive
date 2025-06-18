import React, { useState, useRef } from "react";
import axios from 'axios';
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

const Sidebar = ({ onUploadSuccess}) => {
  const [active, setActive] = useState("My Drive");
  const [showSourceMenu, setShowSourceMenu] = useState(false);

  // Create a reference to the hidden input element
  const fileInputRef = useRef(null);

  const API_BASE_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_API_BASE_URL;

  const handleGoogleDriveUpload = () => {};
  const handleDropboxUpload = () => {};

  const handleLocalUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("File selected:", file); // Confirm it works

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        //alert("File uploaded successfully");
        onUploadSuccess?.();
        console.log(res.data.newFile);
      } else {
        alert("Internal server error");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="p-5 bg-white/70 backdrop-blur-md shadow-md min-h-screen space-y-6 border-r border-gray-200">
      {/* Upload Button */}
      <div className="relative">
        <button
          onClick={() => setShowSourceMenu(!showSourceMenu)}
          className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl shadow hover:shadow-lg transition duration-200 hover:from-indigo-600 hover:to-purple-700 cursor-pointer"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span className="font-semibold">Upload File</span>
        </button>

        {showSourceMenu && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                fileInputRef.current?.click(); //  Trigger the hidden input click
                setShowSourceMenu(false);
              }}
            >
              Upload from Device
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleGoogleDriveUpload}
            >
              Upload from Google Drive
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleDropboxUpload}
            >
              Upload from Dropbox
            </button>
          </div>
        )}

        {/*  Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleLocalUpload}
        />
      </div>

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
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                }`}
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
