const Wallet = require('../models/wallet.model');
const Customer = require('../models/customer.model');
const ActivityLog = require('../models/activities.model');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const truncatedUuid = uuid.replace(/-/g, '').slice(0, 6);


exports.updateWallet = (req, res) => {
    const id = req.params.id;
    Wallet.update(req.body, {
        where: { id: id }
    })
    .then((result) => {
        if (result[0] === 1) {
            res.status(200).send({ message: 'Wallet updated successfully!' });
        } else {
            res.status(404).send({ message: 'Wallet not found or no changes were made.' });
        }
    })
    .catch((err) => {
        console.error('Error updating wallet:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    });
};

exports.deposit = async (req, res) => {
    const { customerId, amount } = req.body;
    try {
        const wallet = await Wallet.findOne({ where: { customerId: customerId } });

        if (!wallet) {
            return res.status(404).send({ message: `Wallet with customerId ${customerId} not found!` });
        }

        // Update wallet balance
        wallet.balance += amount;
        await wallet.save();

        // Log the deposit action
        await ActivityLog.create({
            walletId: wallet.id,
            transactionId: null, // Since it's a deposit, transactionId is null
            action: 'deposit'
        });

        return res.status(200).send({ message: 'Deposit successful!' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.withdraw = async(req, res) => {
    const { customerId, amount,transactionId  } = req.body;
    try {
        const wallet = await Wallet.findOne({ where: { customerId: customerId } });

        if (!wallet) {
            return res.status(404).send({ message: `Wallet with customerId ${customerId} not found!` });
        }

        // Update wallet balance
        wallet.balance -= amount;
        await wallet.save();

        // Log the deposit action


        return res.status(200).send({ message: 'Deposit successful!' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.getWallets = (req, res) => {
    Wallet.findAll()
    .then((wallets) => {
        res.status(200).send(wallets);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.getWalletsByCustomerId = (req, res) => {
    const customerId = req.params.customerId;
    Wallet.findAll({
        where: { customerId: customerId }
    })
    .then((wallets) => {
        res.status(200).send(wallets);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.getWalletById = (req, res) => {
    const id = req.params.id;
    Wallet.findByPk(id)
    .then((wallet) => {
        res.status(200).send(wallet);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.deleteWallet = (req, res) => {
    const id = req.params.id;
    Wallet.destroy({
        where: { id: id }
    })
    .then(() => {
        res.status(200).send({ message: 'Wallet deleted successfully!' });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};