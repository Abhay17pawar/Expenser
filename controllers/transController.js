const transactionModel = require('../models/transactionModel');

// Get all transactions for a specific user by email
const getAllTransaction = async (req, res) => {
    try {
        const transactions = await transactionModel.find({ email: req.params.email });
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add a transaction
const addTransaction = async (req, res) => {
    const { email, name, type, category, amount, date } = req.body;

    try {
        const newTransaction = new transactionModel({
            email, // Ensure email is stored with the transaction
            name,
            type,
            category,
            amount: Number(amount), // Ensure amount is a number
            date: new Date(date), // Ensure date is a Date object
        });

        await newTransaction.save();
        res.status(201).send("New transaction created!");
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).send("An error occurred while adding the transaction.");
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { name, type, category, amount, date } = req.body;

    try {
        const updatedTransaction = await transactionModel.findByIdAndUpdate(
            id,
            {
                name,
                type,
                category,
                amount: Number(amount),
                date: new Date(date),
            },
            { new: true } // Return the updated document
        );

        if (!updatedTransaction) {
            return res.status(404).send("Transaction not found");
        }

        res.status(200).send("Transaction updated successfully!");
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).send("An error occurred while updating the transaction.");
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTransaction = await transactionModel.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).send("Transaction not found");
        }

        res.status(200).send("Transaction deleted successfully!");
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).send("An error occurred while deleting the transaction.");
    }
};

module.exports = { getAllTransaction, addTransaction, updateTransaction, deleteTransaction };
