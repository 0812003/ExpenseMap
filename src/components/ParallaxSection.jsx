import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';

const ParallaxSection = () => {
    useEffect(() => {
            Aos.init({ duration: 1000 }); // duration in ms
        }, []);
  return (
    <div
      className="relative bg-fixed bg-center bg-cover h-[400px] flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/parallax.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl p-6" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-4xl font-bold text-white mb-3">
          Budget Smart, Live Free
        </h2>
        <p className="text-white text-lg">
          Simplify your money management with powerful tools that help you take control of your expenses and savings.
        </p>
      </div>
    </div>
  );
};

export default ParallaxSection;
