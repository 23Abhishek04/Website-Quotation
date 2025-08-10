import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-cyan-100">
      <h1 className="text-3xl font-serif font-semibold">This is Sample Video</h1>
      <video
        src="videos/sample.mp4"
        autoPlay
        loop
        muted
        className=" h-[400px]  w-auto"
      />
    </div>
  );
};

export default page;