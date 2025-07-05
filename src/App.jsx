import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExpensePage from './pages/ExpensePage';
import SummaryPage from './pages/SummaryPage';
import AuthPage from './pages/AuthPage';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import GoogleRedirect from './pages/GoogleRedirect';

const App = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-center"     
        autoClose={3000}            
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"            
      />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/google-redirect" element={<GoogleRedirect />} />
        </Routes>
    </div>
  );
};

export default App;
