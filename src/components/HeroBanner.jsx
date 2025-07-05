import React from 'react';

const HeroBanner = ({ title, description, backgroundImage }) => {
  return (
    <div
      className="relative bg-fixed bg-center bg-cover min-h-[500px] px-4 py-10 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl text-white font-bold mb-4">{title}</h1>
        <p className="text-white max-w-xl mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
