import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  CloudArrowDownIcon,
  EyeIcon,
  ShareIcon,
  PencilIcon,
  TrashIcon,
  
} from "@heroicons/react/24/outline";
import {
  // ...
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";

import {
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { useState } from "react";


const FileCard = ({ id, name, size, date, onDelete, onDownload,onMenuclick,bookmarked }) => {

  const [menuopen,setMenuopen] = useState(false)
  
  return (

    
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transform transition duration-200 w-full cursor-pointer">
      {/* Header Section */}
      <div className="flex justify-between items-start gap-2">
        <p className="text-base sm:text-lg font-semibold truncate max-w-[80%]">
          {name}
        </p>

        {/* 3-dot Menu */}
        <Menu as="div" className="relative " open={menuopen} onClose ={()=> setMenuopen(false)}>
          <MenuButton 
            onClick={()=>setMenuopen(!menuopen)}
          className="p-1.5 rounded-full hover:bg-gray-100 transition">
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
          </MenuButton>

          <MenuItems className="absolute right-0 z-20 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none ">
            <div className="px-1 py-1 space-y-1">
              {[
                { icon: EyeIcon, label: "Preview" },
                { icon: ShareIcon, label: "Share" },
                { icon: PencilIcon, label: "Rename" },
                {icon : bookmarked? StarIconSolid : StarIconOutline, label : "Bookmark"}
              ].map(({ icon: Icon, label }) => (
                <MenuItem key={label}>
                  {({ active }) => (
                    <button
                      onClick={(e)=> {
                       //e.preventDefault()
                        onMenuclick(label)

                        setTimeout(() => {
                          setMenuopen(false)
                        }, 5000);
                        

                      }}
                      className={`${
                        active
                          ? "bg-indigo-100 text-indigo-700 cursor-pointer"
                          : "text-gray-700"
                      } flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  )}
                </MenuItem>
              ))}

              {/* Delete */}
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(id)} // 🔧 call prop function
                    className={`${
                      active ? "bg-red-100 text-red-700" : "text-red-600"
                    } flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm cursor-pointer`}
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </button>
                )}
              </MenuItem>

                
            </div>
          </MenuItems>
        </Menu>
      </div>

      {/* Metadata Section */}
      <div className="mt-2 text-sm text-gray-500 space-y-1">
        <p>Size: {size}</p>
        <p>Uploaded: {date}</p>
      </div>

      {/* Download Button */}
      <button
        onClick={() => onDownload(id)}
        className="mt-3 inline-flex items-center gap-1 text-indigo-600 text-sm hover:underline hover:text-indigo-700 transition cursor-pointer"
      >
        <CloudArrowDownIcon className="h-4 w-4" />
        Download
      </button>
    </div>
  );
};

export default FileCard;
