const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Add email to the schema
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
});

const transactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = transactionModel;
