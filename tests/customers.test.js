const request = require('supertest');
const express = require('express');
const app = express();
const customerController = require('../controllers/customerController');

app.use(express.json());
app.post('/createCustomer', customerController.createCustomer);

describe('Customer Controller', () => {
    it('should create a new customer and wallet', async () => {
        const res = await request(app)
            .post('/createCustomer')
            .send({
                fullName: 'Test User',
                email: 'testsuer@gmail.com',
                phone_number: '1234597890',
                address: '123 Test St',
                gender: 'Male'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Customer and Wallet created successfully!');
    });

    // Add more tests as needed
});