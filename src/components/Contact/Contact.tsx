import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-black flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-3/5 h-4/5 max-h-4/5 flex flex-col overflow-y-auto over shadow-purple-700 shadow-2xl rounded-2xl bg-black">
        <div className="text-center pb-12" />
        <div className="flex justify-center mb-10 absolute top-10 right-10" />
        <div className="text-white flex px-12 pt-9" />
      </div>
    </div>
  );
};

export default Contact;
