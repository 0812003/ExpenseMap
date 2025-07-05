import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/Expense/ExpenseForm';
import ExpenseList from '../components/Expense/ExpenseList';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { TrendingUp, DollarSign, Calendar, PieChart, Wallet } from 'lucide-react';
import { FcMoneyTransfer } from 'react-icons/fc';
import Footer from '../components/Footer';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/expense/all`, {
        withCredentials: true,
      });

      if (data.success) {
        setExpenses(data.expenses);
        setErrorOccurred(false);
      } else {
        setErrorOccurred(true);
      }
    } catch (err) {
      setErrorOccurred(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Calculate stats
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
  });
  const monthlyTotal = thisMonthExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-black bg-clip-text">
              💰 Expense Tracker
            </h1>
            <p className="text-xl sm:text-2xl text-blue-950 max-w-3xl mx-auto leading-relaxed">
              Take control of your finances with smart expense tracking
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      </div>

      {/* Stats Section */}
      {!loading && expenses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">₹{monthlyTotal.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Expense</h2>
              <p className="text-gray-600">Record your expenses to keep track of your spending</p>
            </div>
            <ExpenseForm onAdd={(newExpense) => setExpenses([newExpense, ...expenses])} />
          </div>

          {/* List Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Expenses</h2>
              <p className="text-gray-600">View and manage your expense history</p>
            </div>
            <ExpenseList
              expenses={expenses}
              loading={loading}
              errorOccurred={errorOccurred}
              onDelete={(id) => setExpenses(expenses.filter((e) => e._id !== id))}
            />
          </div>
        </div>
        
        {/* Empty State Enhancement */}
        {!loading && expenses.length === 0 && !errorOccurred && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PieChart className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Tracking Your Expenses</h3>
              <p className="text-gray-600 mb-6">Add your first expense to begin managing your finances effectively</p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg">
                  <span className="font-medium">👆 Use the form above to get started</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ExpensePage;