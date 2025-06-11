import React, { useState } from "react";
import FileCard from "./filecard";
import Sidebar from "./sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm">
        <Sidebar />
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Sidebar Panel */}
          <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
            <Sidebar />
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
          {/* Heading (hidden on mobile, shown on md+) */}
          <h1 className="hidden md:block text-2xl font-bold text-gray-800 mb-6">
            My Files
          </h1>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FileCard name="resume.pdf" size="1.2 MB" date="08 Jun 2025" />
            <FileCard name="project.zip" size="5.6 MB" date="07 Jun 2025" />
            <FileCard name="image.png" size="740 KB" date="06 Jun 2025" />
            {/* Add more cards or map real data here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
