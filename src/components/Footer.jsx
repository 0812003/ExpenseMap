import React, { useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
    useEffect(() => {
                Aos.init({ duration: 1000 }); // duration in ms
            }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 min-h-72 px-15 py-10">
      
      <div className='p-7' data-aos="fade-right" data-aos-delay="100">
        <h1 className="font-bold text-2xl text-gray-800 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>ExpenseMap</h1>
        <p className="text-gray-600">Your trusted partner in budgeting smarter and living better.</p>
      </div>
      
      <div className="flex flex-col items-start p-7" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Quick Links</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="cursor-pointer hover:text-blue-500 font-medium">Home</li>
          <li className="cursor-pointer hover:text-blue-500 font-medium">About</li>
          <li className="cursor-pointer hover:text-blue-500 font-medium">Expense</li>
          <li className="cursor-pointer hover:text-blue-500 font-medium">Summary</li>
          <li className="cursor-pointer hover:text-blue-500 font-medium">Sign Up</li>
        </ul>
      </div>
      
      <div className='p-7' data-aos="fade-left" data-aos-delay="100">
        <h2 className="text-xl font-semibold text-gray-950 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Contact Info</h2>
        <div className="flex items-center gap-3 text-gray-900 mb-2">
          <FaPhoneAlt className="text-blue-950" />
          <span>+123 456 7890</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <FaEnvelope className="text-blue-950" />
          <span>info@expensetracker.com</span>
        </div>
      </div>

    </div>
  );
};

export default Footer;
