const Transaction = require('../models/Transaction');

// GET all transactions for current user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

// POST new transaction
const addTransaction = async (req, res) => {
  const { title, amount, type, category } = req.body;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTransaction = new Transaction({
      user: req.user,
      title,
      amount,
      type,
      category,
    });

    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};

// DELETE a transaction
const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
