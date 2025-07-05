import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const { userData, backendURL, setUserData, setIsLoggedIn, loadingUser } = useContext(AppContent);

  const logOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + '/api/auth/logout');
      toast.success("Logged Out Successfully!");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold'
      : 'hover:text-blue-500 font-medium transition-all';

  return (
    <div className="w-full flex justify-center fixed top-6 z-50">
      <div className="backdrop-blur-md bg-white/30 shadow-lg border border-white/20 
                      rounded-full px-6 py-3 flex items-center justify-between mx-4 w-full max-w-[88rem]">

        <h1 className="font-bold text-xl text-gray-800 cursor-pointer" onClick={() => { navigate('/') }}>ExpenseMap</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-900">
          <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
          <li><NavLink to="/about" className={navLinkStyles}>About</NavLink></li>
          <li><NavLink to="/expense" className={navLinkStyles}>Expense</NavLink></li>
          <li><NavLink to="/summary" className={navLinkStyles}>Summary</NavLink></li>
        
          {!loadingUser ? (
            userData ? (
              <div className="relative group">
                {userData.profilePic ? (
                  <img
                    src={userData.profilePic}
                    alt="profile"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover shadow"
                  />

                ) : (
                  <div className="bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full font-bold shadow">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded-4xl text-black pt-10">
                  <ul className="list-none bg-white/70 m-0 p-2 text-sm">
                    {!userData.isAccountVerified && (
                      <li
                        onClick={sendVerificationOtp}
                        className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                      >
                        Verify Email
                      </li>
                    )}
                    <li
                      onClick={logOut}
                      className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <li>
                <NavLink
                  to="/signup"
                  className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 
                   text-white py-2 px-4 rounded-full shadow-md font-medium transition-all"
                >
                  Sign Up
                </NavLink>
              </li>
            )
          ) : (
            <div className="w-9 h-9 bg-gray-300 animate-pulse rounded-full"></div>
          )}

        </ul>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-20 right-4 w-[90%] bg-white rounded-xl shadow-xl 
                    p-6 backdrop-blur-md transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        <ul className="flex flex-col items-center gap-6 text-gray-900">
          <li><NavLink to="/" className={navLinkStyles} onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/about" className={navLinkStyles} onClick={toggleMenu}>About</NavLink></li>
          <li><NavLink to="/expense" className={navLinkStyles} onClick={toggleMenu}>Expense</NavLink></li>
          <li><NavLink to="/summary" className={navLinkStyles} onClick={toggleMenu}>Summary</NavLink></li>
          <li className="w-full flex justify-center">
            <NavLink
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-center 
                         shadow-md font-medium transition-all w-fit"
              onClick={toggleMenu}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
