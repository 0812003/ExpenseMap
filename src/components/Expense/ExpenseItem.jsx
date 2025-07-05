import React from 'react';
import { deleteExpense } from '../../api/expense';

const ExpenseItem = ({ item, onDeleted }) => {
  const handleDelete = async () => {
    await deleteExpense(item._id);
    onDeleted();
  };

  return (
    <div className="bg-gray-100 p-3 rounded shadow mb-2 flex justify-between items-center">
      <div>
        <h4 className="font-bold">{item.title}</h4>
        <p>₹{item.amount} • {item.category} • {new Date(item.date).toLocaleDateString()}</p>
      </div>
      <button onClick={handleDelete} className="text-red-500">Delete</button>
    </div>
  );
};

export default ExpenseItem;
