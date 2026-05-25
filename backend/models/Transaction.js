const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  type: String, // income or expense
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);