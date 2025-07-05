import expenseModel from "../models/expenseModel.js";

import userModel from "../models/userModel.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    // Step 1: Get the user
    const user = await userModel.findById(req.userId);

    // Step 2: If user not found or not verified, block request
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.isAccountVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email to add expenses" });
    }

    // Step 3: Proceed with saving expense
    const newExpense = new expenseModel({
      userId: req.userId,
      title,
      amount,
      category,
      date,
      note,
    });

    await newExpense.save();

    return res.status(201).json({ success: true, expense: newExpense });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getUserExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Optional: delete & update
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await expenseModel.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ success: true, message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await expenseModel.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

