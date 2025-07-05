import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import GoogleLoginButton from '../components/GoogleLoginButton';


const AuthPage = () => {
  const navigate = useNavigate();

  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContent)

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + '/api/auth/register', { name, email, password });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          toast.success("Registration Successful!");
          navigate("/");
        } else {
          // alert(data.message);
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + '/api/auth/login', { email, password });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();

          toast.success("Login Successful!");
          navigate("/");
        } else {
          // alert(data.message);
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-white via-blue-200 to-blue-400">
      <Navbar />

      <div className="relative bg-white/80 backdrop-blur-lg text-gray-800 p-10 rounded-2xl shadow-xl w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm text-center mb-6 text-gray-600">
          {state === "Sign Up" ? "Create your account to get started" : "Login to your account"}
        </p>

        <AnimatePresence mode="wait">
          <motion.form
            key={state}
            onSubmit={onSubmitHandler}
            {...fadeSlide}
          >
            {state === "Sign Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-blue-200">
                {/* <img src={assets.person_icon} alt="" className="w-5" /> */}
                <User size={18} className="text-gray-700" />
                <input
                  onChange={e => setName(e.target.value)} value={name}
                  className="outline-none bg-transparent w-full placeholder-gray-700 text-sm"
                  type="text" placeholder="Full Name" required
                />
              </div>
            )}

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-blue-200">
              {/* <img src={assets.mail_icon} alt="" className="w-5" /> */}
              <Mail size={18} className="text-gray-700" />
              <input
                onChange={e => setEmail(e.target.value)} value={email}
                className="outline-none bg-transparent w-full placeholder-gray-700 text-sm"
                type="email" placeholder="Email Address" required
              />
            </div>

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-blue-200">
              {/* <img src={assets.lock_icon} alt="" className="w-5" /> */}
              <Lock size={18} className="text-gray-700" />
              <input
                onChange={e => setPassword(e.target.value)} value={password}
                className="outline-none bg-transparent w-full placeholder-gray-700 text-sm"
                type="password" placeholder="Password" required
              />
            </div>

            {state === "Login" && (
              <p
                className="mb-4 text-sm text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate("/reset-password")}
              >
                Forgot Password?
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-medium shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all"
            >
              {state}
            </button>
            {state === "Login" && (
              <div className="mt-4 flex justify-center">
                <GoogleLoginButton />
              </div>
            )}
          </motion.form>
        </AnimatePresence>

        <p className="text-gray-600 text-center text-sm mt-6">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-indigo-500 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-indigo-500 cursor-pointer underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

