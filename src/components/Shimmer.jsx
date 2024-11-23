import React from 'react';

const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
   
      <div className="bg-gray-200 animate-pulse rounded-lg p-6">
        <div className="bg-gray-300 h-8 w-3/4 mb-4"></div>
        <div className="bg-gray-300 h-4 w-full"></div>
      </div>
      <div className="bg-gray-200 animate-pulse rounded-lg p-6">
        <div className="bg-gray-300 h-8 w-3/4 mb-4"></div>
        <div className="bg-gray-300 h-4 w-full"></div>
      </div>
      <div className="bg-gray-200 animate-pulse rounded-lg p-6">
        <div className="bg-gray-300 h-8 w-3/4 mb-4"></div>
        <div className="bg-gray-300 h-4 w-full"></div>
      </div>
    </div>
  );
};

export default Shimmer;
