const Transaction = require('../models/transactions.model');
const Customer = require('../models/customer.model');
const Wallet = require('../models/wallet.model');
const ActivityLog = require('../models/activities.model');
const { v4: uuidv4 } = require('uuid');
const { DataTypes, Sequelize } = require('sequelize');
const transactionController = require('../controllers/transactionController');

jest.mock('../models/transactions.model');
jest.mock('../models/customer.model');
jest.mock('../models/wallet.model');
jest.mock('../models/activities.model');

describe('Transaction Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createTransaction', async () => {
        const req = {
            body: {
                amount: 100,
                status: 'pending',
                senderAccountId: 4,
                receiverAccountId: 5,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        Transaction.create.mockResolvedValueOnce({});
        Customer.findByPk.mockResolvedValueOnce({});

        await transactionController.createTransaction(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Transaction created successfully!' });
    });

    test('updateTransaction', async () => {
        const req = {
            params: {
                id: 1,
            },
            body: {
                amount: 200,
                status: 'completed',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        Transaction.update.mockResolvedValueOnce({});

        await transactionController.updateTransaction(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Transaction updated successfully!' });
    });

});