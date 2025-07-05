import Aos from 'aos';
import React, { useEffect } from 'react'
import 'aos/dist/aos.css';

const Detail = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 }); // duration in ms
    }, []);
    return (
        <div className='py-10 px-15'>
            <h2 className='text-2xl font-bold text-gray-800 mb-12 text-center' data-aos="fade-in" data-aos-delay="100">Why Use ExpenseTracker?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className='px-7 py-3 border-2 border-gray-300 shadow-md rounded-lg max-w-sm min-h-60 mx-auto flex flex-col justify-center items-center text-center' data-aos="zoom-in" data-aos-delay="100">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">📊 Real-Time Expense Tracking</h3>
                    <p className="text-gray-600">
                        Monitor your spending instantly as you log expenses. Stay informed with up-to-date insights on where your money goes.
                    </p>
                </div>
                <div className='px-7 py-3 border-2 border-gray-300 shadow-md rounded-lg max-w-sm min-h-60 mx-auto flex flex-col justify-center items-center text-center' data-aos="zoom-in" data-aos-delay="100">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">📅 Monthly Budget Management</h3>
                    <p className="text-gray-600">
                        Set monthly budgets and get alerts when you're close to overspending. Plan smarter and avoid surprises.
                    </p>
                </div>
                <div className='px-7 py-3 border-2 border-gray-300 shadow-md rounded-lg max-w-sm min-h-60 mx-auto flex flex-col justify-center items-center text-center' data-aos="zoom-in" data-aos-delay="100">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">📈 Visual Summary & Analytics</h3>
                    <p className="text-gray-600">
                        Understand your spending habits with clean charts and summaries. Analyze categories to optimize your financial goals.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Detail