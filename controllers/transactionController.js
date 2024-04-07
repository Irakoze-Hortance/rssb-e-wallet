const Transaction=require('../models/transactions.model');
const Customer=require('../models/customer.model');
const Wallet=require('../models/wallet.model');
const ActivityLog=require('../models/activities.model');
const { v4: uuidv4 } = require('uuid');

const { DataTypes,Sequelize } = require('sequelize');

const sequelize = new Sequelize('tekana', 'root', 'Habumuremyi', {
    host: 'localhost',
    dialect: 'mysql' 
  });

exports.createTransaction = (req, res) => {
    const { amount, status, senderAccountId, receiverAccountId } = req.body;
    Transaction.create({
        amount,
        status:"pending",
        senderAccountId,
        receiverAccountId,
    })
    .then(() => {
        Customer.findByPk(senderAccountId)
        .then((sender) => {
            if (!sender) {
                res.status(404).send({ message: `Sender account with id ${senderAccountId} not found!` });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
        Customer.findByPk(receiverAccountId)
        .then((receiver) => {
            if (!receiver) {
                res.status(404).send({ message: `Receiver account with id ${receiverAccountId} not found!` });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
    })
    
    .then((transaction) => {
        res.status(200).send({ message: 'Transaction created successfully!' });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.updateTransaction = (req, res) => {
    const id = req.params.id;
    Transaction.update(req.body, {
        where: { id: id }
    })
    .then(() => {
        res.status(200).send({ message: 'Transaction updated successfully!' });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.getTransactions = (req, res) => {
    Transaction.findAll()
    .then((transactions) => {
        res.status(200).send(transactions);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};  

exports.getTransactionsByReceiverAcc = (req, res) => {
    const receiverAccountId = req.params.receiverAccountId;
    Transaction.findAll({
        where: { receiverAccountId: receiverAccountId }
    })
    .then((transactions) => {
        res.status(200).send(transactions);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.getTransactionsBySenderAcc = (req, res) => {
    const senderAccountId = req.params.senderAccountId;
    Transaction.findAll({
        where: { senderAccountId: senderAccountId }
    })
    .then((transactions) => {
        res.status(200).send(transactions);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.cancelTransaction = (req, res) => {
    const id = req.params.id;
    Transaction.update({ status: 'cancelled' }, {
        where: { id: id }
    })
    .then(() => {
        res.status(200).send({ message: 'Transaction cancelled successfully!' });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.processTransaction = async (transactionId) => {
    const t = await sequelize.transaction();

    try {
        // Retrieve transaction details
        const transaction = await Transaction.findByPk(transactionId, { transaction: t });
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Retrieve sender and receiver wallet details
        const senderWallet = await Wallet.findOne({ where: { customerId: transaction.senderAccountId }, transaction: t });
        const receiverWallet = await Wallet.findOne({ where: { customerId: transaction.receiverAccountId }, transaction: t });

        if (!senderWallet || !receiverWallet) {
            throw new Error('Sender or receiver wallet not found');
        }

        if (senderWallet === receiverWallet) {
            await t.rollback();
            return { success: false, message: 'Sender and receiver wallets cannot be the same', status: 'cancelled' };
        }

        // Validate sender has sufficient balance
        if (senderWallet.balance < transaction.amount) {
            await t.rollback();
            return { success: false, message: 'Insufficient balance', status: 'cancelled' };
        }

        // Deduct amount from sender's wallet balance
        let newSenderBalance = senderWallet.balance - transaction.amount;
        if (newSenderBalance < 0) {
            await t.rollback();
            return { success: false, message: 'Sender balance would go below zero', status: 'cancelled' };
        }
        senderWallet.balance = newSenderBalance;

        // Add amount to receiver's wallet balance
        let newReceiverBalance = Number(receiverWallet.balance) + Number(transaction.amount);
        if (newReceiverBalance > Number.MAX_SAFE_INTEGER) { 
            await t.rollback();
            return { success: false, message: 'Receiver balance would exceed maximum limit', status: 'cancelled' };
        }
        receiverWallet.balance = newReceiverBalance;

        // Update sender and receiver wallet balances in the database
        await senderWallet.save({ transaction: t });
        await receiverWallet.save({ transaction: t });

        // Update transaction status to 'success' in the database
        await Transaction.update({ status: 'success' }, { where: { id: transactionId }, transaction: t });

        // Create activity logs for successful transaction
        await ActivityLog.create({
            walletId: senderWallet.id,
            transactionId: transactionId,
            action: 'transfer_success'
        }, { transaction: t });
        await ActivityLog.create({
            walletId: receiverWallet.id,
            transactionId: transactionId,
            action: 'receive_success'
        }, { transaction: t });

        await t.commit();

        return { success: true, message: 'Transaction successful', status: 'success' };
    } catch (error) {
        await t.rollback();
        return { success: false, message: error.message };
    }
};

exports.deleteTransaction = (req, res) => {
    const id = req.params.id;
    Transaction.destroy({
        where: { id: id }
    })
    .then(() => {
        res.status(200).send({ message: 'Transaction deleted successfully!' });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

