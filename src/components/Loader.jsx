import React from "react";
import Loading from "./Loading";
import duckvd from "../assets/duck.mp4";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={duckvd} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
      {/* Overlay */}
      <div className="relative z-10 pt-56">
        <Loading />
      </div>
    </div>
  );
};

export default Loader;
