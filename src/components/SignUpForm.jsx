import React, { useState } from 'react';

const SignUpForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Data:', form);
    // Send to backend here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" required onChange={handleChange} className="input" />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="input" />
      <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="input" />
      <button type="submit" className="btn-primary w-full">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
