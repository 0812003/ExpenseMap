import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';

const steps = [
  "Create an account and set up your budget.",
  "Start logging your expenses daily.",
  "Review monthly summaries and insights.",
];

const Timeline = () => {
    useEffect(() => {
          Aos.init({ duration: 1000 });
        }, [])
  return (
    <div className="py-16 px-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-10" data-aos="fade-in" data-aos-delay="500">How It Works</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4" data-aos="fade-right" data-aos-delay="100">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {index + 1}
            </div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
