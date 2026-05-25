const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Add
router.post('/add', async (req, res) => {
  const t = new Transaction(req.body);
  await t.save();
  res.json({ message: "Added" });
});

// Get
router.get('/:userId', async (req, res) => {
  const data = await Transaction.find({ userId: req.params.userId });
  res.json(data);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;