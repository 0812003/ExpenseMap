import React, { useContext, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {

  axios.defaults.withCredentials=true;

  const navigate = useNavigate();

  const {backendURL,getUserData,userData,isLoggedIn} = useContext(AppContent);

  const inputrefs = useRef([]);

  const handleInput = (e,index)=>{
    if(e.target.value.length>0 && index<inputrefs.current.length-1){
      inputrefs.current[index+1].focus();
    }
  }
  const handleKeyDown = (e,index)=>{
    if(e.key==='Backspace' && e.target.value === '' && index>0){
      inputrefs.current[index-1].focus();
    }
  }
  const handlePaste = (e,index) =>{
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index) => {
      if(inputrefs.current[index]){
        inputrefs.current[index].value=char
      }
    });
  }
  const onSubmitHandler= async (e)=>{
    try {
      e.preventDefault();
      const otpArray = inputrefs.current.map(e=>e.value);
      const otp = otpArray.join('');
      
      const {data} = await axios.post(backendURL + '/api/auth/verify-account',{otp});
      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn,userData])
  
  return (
    <div className="min-h-screen flex items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-white via-blue-200 to-blue-400">
      <Navbar />
      <form onSubmit={onSubmitHandler} className='relative bg-white/80 backdrop-blur-lg text-gray-800 p-10 rounded-2xl shadow-xl w-full sm:w-96'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-950'>Enter the 6-digit code send to your email.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_,index)=>(
            <input type="text" maxLength='1' required key={index} 
             className='w-12 h-12 bg-blue-200 text-indigo-950 text-center text-xl rounded-md outline-blue-400'
             ref={e=> inputrefs.current[index] = e}
             onInput={(e)=>handleInput(e,index)}
             onKeyDown={(e)=>handleKeyDown(e,index)}
            />
          ))}
        </div>
        <button className='w-full py-3 mt-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-medium shadow-md hover:from-indigo-500 hover:to-indigo-700 transition-all'>
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify