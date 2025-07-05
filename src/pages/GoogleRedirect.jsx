import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

const GoogleRedirect = () => {
  const { getUserData, setIsLoggedIn } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/is-auth`, {
          withCredentials: true,
        });
        if (data.success) {
          await getUserData();
          setIsLoggedIn(true);
          toast.success("Login Successful via Google");
          navigate('/');
        } else {
          toast.error("Authentication failed");
          navigate('/auth');
        }
      } catch (error) {
        toast.error("Google login failed");
        navigate('/auth');
      }
    };
    checkAuth();
  }, []);

  return <p className="text-center mt-10">Signing in with Google...</p>;
};

export default GoogleRedirect;
