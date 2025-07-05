import React from 'react';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses, loading, errorOccurred, onDelete }) => {
  if (loading) {
    return <div className="bg-white p-6 rounded shadow text-center">Loading expenses...</div>;
  }

  if (!loading && expenses.length === 0 && !errorOccurred) {
    return (
      <div className="bg-white p-6 rounded shadow text-center space-y-2">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No expenses" className="w-20 mx-auto opacity-70" />
        <p>No expenses yet</p>
      </div>
    );
  }

  if (errorOccurred) {
    return <div className="bg-white p-6 rounded shadow text-red-500 text-center">Failed to load expenses.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow h-[400px] flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;