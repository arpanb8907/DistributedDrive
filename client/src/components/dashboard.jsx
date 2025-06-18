import React, { useEffect, useState } from "react";
import FileCard from "./filecard";
import Sidebar from "./sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setfiles] = useState([]);

  const API_BASE_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_API_BASE_URL;

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getfiles?type=uploaded`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setfiles(response.data.files);
      }
    } catch (error) {
      console.error("Error in fetching files", error);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/delete/files/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setfiles((prev) => prev.filter((file) => file._id != id));
      }

      else{
        alert("Deletion not completed due to server error")
      }
    } catch (error) {
      console.log("error while deleting", error);
    }
  };

  const handleDownload = async (id) => {};

  const formatSize = (size) => {
    if (size < 1024) return size + "B";

    if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + "KB";
    } else {
      return (size / (1024 * 1024)).toFixed(1) + "MB";
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm">
        <Sidebar onUploadSuccess={fetchFiles} />
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Sidebar Panel */}
          <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
            <Sidebar onUploadSuccess={fetchFiles} />
          </div>
          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Bar (Mobile only) */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">My Files</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Main Section */}
        <main className="p-4 sm:p-6">
          <h1 className="hidden md:block text-2xl font-bold text-gray-800 mb-6">
            My Files
          </h1>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <FileCard
                key={file._id}
                id={file._id}
                name={file.originalname}
                size={formatSize(file.size)}
                date={formatDate(file.createdAt)}
                onDelete={handleDelete}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
