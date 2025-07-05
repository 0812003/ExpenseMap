import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addExpense, getUserExpenses, deleteExpense, updateExpense } from '../controllers/expenseController.js';

const expenseRouter = express.Router();

expenseRouter.post('/add', userAuth, addExpense);
expenseRouter.get('/all', userAuth, getUserExpenses);
expenseRouter.delete('/delete/:id', userAuth, deleteExpense);
expenseRouter.put('/update/:id', userAuth, updateExpense);

export default expenseRouter;
