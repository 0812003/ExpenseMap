// App.jsx or HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Detail from '../components/Detail';
import ParallaxSection from '../components/ParallaxSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Hero />
      <Detail />
      <ParallaxSection />
      <Footer />
    </div>
  );
};

export default HomePage;
