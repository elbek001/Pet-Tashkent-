import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
    </div>
  );
};

export default Loader;
