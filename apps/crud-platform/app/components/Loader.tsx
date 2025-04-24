import React from "react";

const Loader = () => {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-zinc-700 text-lg font-medium">
            Loading, please wait...
          </p>
        </div>
      </div>
  );
};

export default Loader;
