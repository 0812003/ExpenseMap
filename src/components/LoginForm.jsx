import React, { useState } from 'react';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', form);
    // Validate with backend here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="input" />
      <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="input" />
      <button type="submit" className="btn-primary w-full">Login</button>
    </form>
  );
};

export default LoginForm;
