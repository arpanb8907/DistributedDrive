import React from "react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to Your Drive
      </h1>
      <p className="text-gray-600 text-lg md:text-xl text-center max-w-xl">
        Securely store, manage, and share your files across devices — built for
        scale and performance.
      </p>
      <button className="cursor-pointer group mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 flex items-center gap-2">
        Get Started
        <span className="transform transition-transform duration-300 group-hover:translate-x-2">
          🚀
        </span>
      </button>
    </div>
  );
};

export default Welcome;
