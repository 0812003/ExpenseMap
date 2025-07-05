import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Fetch all expenses for the logged-in user
export const fetchExpenses = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/expense/all`, {
    withCredentials: true,
  });
  return data;
};

// Add a new expense
export const addExpense = async (expenseData) => {
  const { data } = await axios.post(`${BASE_URL}/api/expense/add`, expenseData, {
    withCredentials: true,
  });
  return data;
};

// Delete an expense by ID
export const deleteExpense = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/api/expense/delete/${id}`, {
    withCredentials: true,
  });
  return data;
};

// Update an expense by ID
export const updateExpense = async (id, updatedData) => {
  const { data } = await axios.put(`${BASE_URL}/api/expense/update/${id}`, updatedData, {
    withCredentials: true,
  });
  return data;
};
