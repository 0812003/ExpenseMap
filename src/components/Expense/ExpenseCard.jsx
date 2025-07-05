import React from 'react';
import { Trash2, Calendar, FileText, Edit3 } from 'lucide-react';

const categoryColors = {
  Food: "bg-red-50 text-red-700 border-red-200",
  Transport: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Shopping: "bg-green-50 text-green-700 border-green-200",
  Bills: "bg-blue-50 text-blue-700 border-blue-200",
  Other: "bg-gray-50 text-gray-700 border-gray-200"
};

const accentColors = {
  Food: "bg-red-400",
  Transport: "bg-yellow-400",
  Shopping: "bg-green-400",
  Bills: "bg-blue-400",
  Other: "bg-gray-400"
};

const categoryIcons = {
  Food: "🍽️",
  Transport: "🚗",
  Shopping: "🛍️",
  Bills: "💳",
  Other: "📋"
};

const ExpenseCard = ({ expense, onDelete, onUpdate }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden">
      {/* Colored accent line */}
      <div className={`absolute top-0 left-0 w-1 h-full ${accentColors[expense.category]}`}></div>
      
      <div className="p-5 pl-8">
        <div className="flex justify-between items-start">
          {/* Left side - Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{categoryIcons[expense.category]}</span>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{expense.title}</h3>
            </div>
            
            {expense.note && (
              <div className="flex items-start gap-2 mb-3">
                <FileText size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 line-clamp-2">{expense.note}</p>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date(expense.date).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}</span>
            </div>
          </div>
          
          {/* Right side - Amount and actions */}
          <div className="flex flex-col items-end gap-3 ml-4">
            <div className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border ${categoryColors[expense.category]}`}>
              {expense.category}
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₹{expense.amount.toLocaleString('en-IN')}
              </div>
              
              <div className="flex items-center gap-1 mt-2">
                <button 
                  onClick={() => onUpdate(expense)} 
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Edit expense"
                >
                  <Edit3 size={16} />
                </button>
                
                <button 
                  onClick={() => onDelete(expense._id)} 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Delete expense"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Border highlight on hover */}
      <div className="absolute inset-0 group-hover:border-b-2 group-hover:border-blue-950 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ExpenseCard;