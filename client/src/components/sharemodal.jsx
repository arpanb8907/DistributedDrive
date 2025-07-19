import React, { useState } from "react";
import {
  CheckCircleIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const ShareModal = ({ file, onClose, onTogglePublic, onCopyLink }) => {
  const [copied, setCopied] = useState(false);
  const [targetedusername,setTargetedusername] = useState('');

  const handleCopyLink = async () => {
    try {
      const link = `${window.location.origin}/file/shared/${file.shareLink}`;
      await navigator.clipboard.writeText(link);
      setCopied(true);
      onCopyLink?.(); // Optional callback if needed
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  const handleAccessChange = (e) => {
    const isPublic = e.target.value === "anyone";
    onTogglePublic(isPublic);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 transition-all duration-300 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Share "{file.originalname}"
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 font-medium mb-2">
            Add people and groups
          </p>

          {/* Input with Send button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              value={targetedusername}
              onChange={(e)=> setTargetedusername(e.target.value)}
            />
            {/* <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
              Send
            </button> */}
          </div>

          {/* You can display added users here */}
          <div className="mt-3 space-y-2">
            {/* Example user */}
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm">
              <div>
                <p className="text-gray-800 font-medium">demo.user@email.com</p>
                <p className="text-xs text-gray-500">Can View</p>
              </div>
              <button className="text-sm text-red-500 hover:underline cursor-pointer">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* People with access */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 font-medium">
            People with access
          </p>
          <div className="mt-1 flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-800">
            <div className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">
              {file.ownerName?.charAt(0) || "Y"}
            </div>
            <div className="flex-1">
              <p className="font-medium">{file.ownerName || "You"}</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        </div>

        {/* General Access */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 font-medium mb-1">
            General access
          </p>
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
            {file.isPublic ? (
              <GlobeAltIcon className="w-5 h-5 text-green-600" />
            ) : (
              <LockClosedIcon className="w-5 h-5 text-gray-500" />
            )}

            <select
              value={file.isPublic ? "anyone" : "restricted"}
              onChange={handleAccessChange}
              className="block w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-10 rounded-lg shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="restricted">Restricted</option>
              <option value="anyone">Anyone with the link</option>
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {file.isPublic
              ? "Anyone on the internet with this link can view."
              : "Only people with access can open with the link."}
          </p>
        </div>

        {/* Shareable Link */}
        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-xl mb-4">
          <span className="text-xs truncate text-gray-600">
            {file.shareLink
              ? `${window.location.origin}/file/shared/${file.shareLink}`
              : "Link not generated"}
          </span>
          <button
            onClick={onCopyLink}
            className="ml-2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="w-4 h-4 text-white" />
                Copied
              </span>
            ) : (
              "Copy Link"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={()=>{
              onClose(targetedusername);
              setTargetedusername('');
            }}
            className="w-48 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
