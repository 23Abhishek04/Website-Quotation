import React from "react";

const page = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src="/videos/sample.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay (optional dark tint) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome </h1>
        <p className="text-lg max-w-xl">This is a Sample</p>
      </div>
    </div>
  );
};

export default page;
