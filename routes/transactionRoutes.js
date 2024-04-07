const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/create', TransactionController.createTransaction);

// Update an existing transaction
router.put('/transactions/:id', TransactionController.updateTransaction);

// Get all transactions
router.get('/transactions', TransactionController.getTransactions);

// Get transactions by receiver account
router.get('/receiver/:receiverAccountId', TransactionController.getTransactionsByReceiverAcc);

// Get transactions by sender account
router.get('/sender/:senderAccountId', TransactionController.getTransactionsBySenderAcc);

// Cancel a transaction
router.put('/cancel/:id', TransactionController.cancelTransaction);

// Delete a transaction
router.delete('/transactions/:id', TransactionController.deleteTransaction);

router.post('/process/:transactionId', async (req, res) => {
    const transactionId = req.params.transactionId;

    try {
        const result = await TransactionController.processTransaction(transactionId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;
