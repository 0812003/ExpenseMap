import React, { useContext, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const { backendURL } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const inputrefs = useRef([]);
  const [loading, setLoading] = useState(false);


  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  }
  const handlePaste = (e, index) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = char
      }
    });
  }
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(backendURL + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSend(true)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputrefs.current.map(e => e.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmited(true);
  }
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(backendURL + '/api/auth/reset-password', { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/signup')
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-white via-blue-200 to-blue-400">

      {/* Form for Submiiting email */}
      {!isEmailSend &&
        <form onSubmit={onSubmitEmail} className='relative bg-white/80 backdrop-blur-lg text-gray-800 p-10 rounded-2xl shadow-xl w-full sm:w-96'>
          <h1 className='text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-950'>Enter Your Registerd Email.</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-blue-200">
            {/* <img src={assets.mail_icon} alt="" className="w-5" /> */}
            <Mail size={18} className="text-gray-700" />
            <input
              onChange={e => setEmail(e.target.value)} value={email}
              className="outline-none bg-transparent w-full placeholder-gray-700 text-sm"
              type="email" placeholder="Email Address" required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-full text-white font-medium shadow-md transition-all
            ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700'}`}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>

        </form>
      }

      {/* form for submitting reset otp */}
      {!isOtpSubmited && isEmailSend &&
        <form onSubmit={onSubmitOtp} className='relative bg-white/80 backdrop-blur-lg text-gray-800 p-10 rounded-2xl shadow-xl w-full sm:w-96'>
          <h1 className='text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
          <p className='text-center mb-6 text-indigo-950'>Enter the 6-digit code send to your email.</p>
          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type="text" maxLength='1' required key={index}
                className='w-12 h-12 bg-blue-200 text-indigo-950 text-center text-xl rounded-md outline-blue-400'
                ref={e => inputrefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button className='w-full py-3 mt-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-medium shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all'>
            Submit
          </button>
        </form>
      }
      {/* form for new password */}
      {isOtpSubmited && isEmailSend &&
        <form onSubmit={onSubmitNewPassword} className='relative bg-white/80 backdrop-blur-lg text-gray-800 p-10 rounded-2xl shadow-xl w-full sm:w-96'>
          <h1 className='text-2xl font-semibold text-center mb-4'>New Password</h1>
          <p className='text-center mb-6 text-indigo-950'>Enter New Password Below.</p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-blue-200">
            {/* <img src={assets.mail_icon} alt="" className="w-5" /> */}
            <Lock size={18} className="text-gray-700" />
            <input
              onChange={e => setNewPassword(e.target.value)} value={newPassword}
              className="outline-none bg-transparent w-full placeholder-gray-700 text-sm"
              type="password" placeholder="New Password" required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-full text-white font-medium shadow-md transition-all
            ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700'}`}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>

        </form>
      }
    </div>
  )
}

export default ResetPassword