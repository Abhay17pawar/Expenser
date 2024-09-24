const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

// Function to add a transaction
const addTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add transaction!', error: error.message });
    }
};

// GET all transactions for a specific user by email
router.get('/get-transactions/:email', async (req, res) => {
    try {
        const transactions = await Transaction.find({ email: req.params.email });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update a transaction
router.put('/update-transaction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run validation on update
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update transaction!', error: error.message });
    }
});

// DELETE route to delete a transaction
router.delete('/delete-transaction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete transaction!', error: error.message });
    }
});

// POST route to add a transaction
router.post('/add-transaction', addTransaction);

module.exports = router;
