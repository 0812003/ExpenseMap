import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const expenseModel = mongoose.models.Expense || mongoose.model("Expense", expenseSchema)

export default expenseModel;
