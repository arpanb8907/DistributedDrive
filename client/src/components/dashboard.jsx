import React, { useEffect, useRef, useState } from "react";
import FileCard from "./filecard";
import Sidebar from "./sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ShareModal from "./sharemodal";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setfiles] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [newfileName, setNewfileName] = useState("");
  const [currentfile, setcurrentfile] = useState(null);
  const location = useLocation();
  const [type, setType] = useState("uploaded");
  const [sharemodalOpen, setShareModalOpen] = useState(false);
  const [restriction, setRestriction] = useState(true);
  const restrictionRef = useRef(restriction);

  useEffect(() => {
    const getTypeFile = () => {
      if (location.pathname === "/") return "uploaded";

      if (location.pathname === "/dashboard/bookmarked") return "bookmarked";
      if (location.pathname === "/dashboard/trash") return "trash";
      if (location.pathname === "/dashboard/SharedWithme")
        return "sharedwithme";

      return "uploaded";
    };

    const newtype = getTypeFile();
    //console.log(newtype)
    setType(newtype);
  }, [location.pathname]);

  const API_BASE_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_API_BASE_URL;

  const fetchFiles = async () => {
    console.log(type);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getfiles?type=${type}`,
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
  }, [type]);

  useEffect(() => {
    restrictionRef.current = restriction;
  }, [restriction]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/delete/files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setfiles((prev) => prev.filter((file) => file._id != id));
      } else {
        alert("Deletion not completed due to server error");
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
  const handlerenameFile = async (e) => {
    e.preventDefault();
    setNewfileName(newfileName);

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/patch/rename/${currentfile._id}`,
        { newfileName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        // update files in the client side
        fetchFiles();
      } else if (response.status === 401 || response.status === 403) {
        alert(
          `New file name can not be empty and must be different from the previous one`
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsRenameOpen(false);
  };

  const bookmarkfile = async (currentfile) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/files/${currentfile._id}/star`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        await fetchFiles();
        const updatedfile = response.data.file;
        setcurrentfile(updatedfile);

        console.log(
          `${updatedfile.isStarred} is the current status of the file`
        );
        console.log(
          `${updatedfile.originalname} is bookmarked current bookmark`
        );
      } else {
        console.log("Server error");
        alert(`Server error`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = async (targetedusername) => {
    
    console.log(targetedusername)
    setShareModalOpen(false);

    console.log(restrictionRef.current);
    if (!restrictionRef.current)
      alert(`Make the file public before sharing with anyone`);

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/sharefiles/${currentfile._id}`,
        {targetedusername},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if(response.status === 200){
        await fetchFiles();
        const updatedfiles = response.data.file 
        setcurrentfile(updatedfiles)

        console.log()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestriction = async (truthvalue) => {
    console.log(truthvalue);
    setRestriction(truthvalue);
    restrictionRef.current = truthvalue;
  };

  const copyLink = async (e) => {
    e.preventDefault();

    try {
      const shareableURL = `${window.location.origin}/file/shared/${currentfile.sharedLink}`;
      await navigator.clipboard.writeText(shareableURL);
      alert(`Link copied to clipboard`);
    } catch (error) {
      console.error(error);
      alert(`Failed to copy the link`);
    }
  };
  const handleMenuclick = async (label, file) => {
    switch (label) {
      case "Preview":
        console.log("preview clicked");
        setPreviewFile(file);
        setIsPreviewOpen(true);
        break;

      case "Share":
        console.log("Shared");
        setShareModalOpen(true);
        setcurrentfile(file);
        break;

      case "Rename":
        setIsRenameOpen(true);
        setcurrentfile(file);

        break;

      case "Bookmark":
        //console.log(file.isStarred);

        bookmarkfile(file);
        break;
      default:
        break;
    }
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
          <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
            <Sidebar onUploadSuccess={fetchFiles} />
          </div>
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
                onMenuclick={(label) => handleMenuclick(label, file)}
                bookmarked={file.isStarred}
              />
            ))}
          </div>
        </main>

        {isPreviewOpen && previewFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Scrollable container */}
            <div className="bg-white max-h-[90vh] overflow-auto p-6 rounded-xl shadow-xl w-full max-w-2xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setIsPreviewOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-4">
                Preview: {previewFile.originalname}
              </h2>

              {/* File preview */}
              {previewFile.mimetype?.startsWith("image/") ? (
                <img
                  src={`${API_BASE_URL}/uploads/${previewFile.filename}`}
                  alt="Preview"
                  className="w-full rounded"
                />
              ) : previewFile.mimetype?.includes("pdf") ? (
                <iframe
                  src={`${API_BASE_URL}/uploads/${previewFile.filename}`}
                  className="w-full h-[70vh] rounded"
                  title="PDF Preview"
                />
              ) : (
                <p className="text-gray-600">
                  Preview not available for this file type.
                </p>
              )}
            </div>
          </div>
        )}

        {isRenameOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md z-40 transition-opacity"></div>

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 transition-all duration-300 animate-fade-in">
              {/* Header */}
              <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
                Rename File
              </h2>

              {/* Input */}
              <div className="space-y-2">
                <label
                  htmlFor="filename"
                  className="block text-sm font-medium text-gray-700"
                >
                  New File Name
                </label>
                <input
                  type="text"
                  id="filename"
                  placeholder="Enter new file name"
                  value={newfileName}
                  onChange={(e) => setNewfileName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsRenameOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handlerenameFile}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}

        {sharemodalOpen && (
          <>
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md z-40 transition-opacity"></div>
            <ShareModal
              file={{ ...currentfile, isPublic: restriction }}
              onClose={handleClose}
              onTogglePublic={handleRestriction}
              onCopyLink={copyLink}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
