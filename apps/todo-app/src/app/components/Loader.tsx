import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-zinc-700 text-base font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
