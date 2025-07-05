import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';

const data = [
  { question: "Is it free to use?", answer: "Yes, ExpenseTracker offers a free version with core features." },
  { question: "Can I export my data?", answer: "Yes, you can export your data as CSV or PDF format anytime." },
  { question: "Is my data safe?", answer: "Absolutely. We use encryption and never share your data." },
];

const FAQ = () => {
    useEffect(() => {
      Aos.init({ duration: 1000 });
    }, [])
    
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white py-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-10" data-aos="fade-in" data-aos-delay="100">FAQs</h2>
      <div className="max-w-3xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-3" data-aos="fade-in" data-aos-delay="100">
            <button
              onClick={() => setOpenIndex(index === openIndex ? null : index)}
              className="w-full text-left text-lg font-medium text-blue-600 focus:outline-none"
            >
              {item.question}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

