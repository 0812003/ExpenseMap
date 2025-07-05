import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Timeline from '../components/Timeline';
import FAQ from '../components/FAQ';
import TestimonialCarousel from '../components/TestimonialCarousel';
import HeroBanner from '../components/HeroBanner';

const AboutPage = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <HeroBanner title="About ExpenseTracker"
        description="ExpenseTracker is your personal budgeting assistant. Track your daily spending, set smart goals, and gain control of your financial future — all in one app."
        backgroundImage="/about.jpg" />
      <Timeline />
      <FAQ />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
};

export default AboutPage;
