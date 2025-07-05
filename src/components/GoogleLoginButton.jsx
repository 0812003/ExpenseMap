
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, "_self");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-3 py-3 px-6 rounded-full bg-white text-gray-800 shadow-md border border-gray-300 hover:shadow-lg transition-all"
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
