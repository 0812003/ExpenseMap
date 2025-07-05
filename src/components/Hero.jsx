import React, { useContext } from 'react';
import Navbar from './Navbar';
import { AppContent } from '../context/AppContext';


const Hero = () => {
  const {userData} = useContext(AppContent)
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-white via-blue-100 to-blue-300 overflow-x-hidden">

      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-44">
        {/* Glass effect wrapper */}
        <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-md rounded-xl p-8 md:w-1/2">
          {userData && (<h1 className="text-4xl font-bold text-gray-800 mb-4">
            Hello {userData.name}
          </h1>)}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Spend Smart, Live Better
          </h2>
          <p className="text-lg text-gray-700">
            Track your expenses, monitor your spending, and manage your budget all in one place — effortlessly and efficiently.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img src="/main.png" alt="Hero" className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
