import React from 'react';

const testimonials = [
  { name: "Aman", feedback: "This app helped me control my monthly expenses!" },
  { name: "Sneha", feedback: "I love the simplicity and clean design." },
  { name: "Ravi", feedback: "Very useful for tracking business and personal spending." },
];

const TestimonialCarousel = () => {
  return (
    <div className="bg-blue-50 py-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-10">What Users Say</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
            <p className="italic text-gray-700 mb-3">"{t.feedback}"</p>
            <p className="font-semibold text-blue-600">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;

