const Customer = require('../models/customer.model');
const Wallet = require('../models/wallet.model');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();
const truncatedUuid = uuid.replace(/-/g, '').slice(0, 6);

exports.createCustomer = (req, res) => {
    const { fullName, email, phone_number, address, gender } = req.body;
    
    Customer.create({
        fullName,
        email,
        phone_number,
        address,
        gender
    })
    .then((customer) => {
        const truncatedUuid = uuidv4().replace(/-/g, '').slice(0, 6);
        
        Wallet.create({
            customerId: customer.id,
            wallet_type: 'standard', 
            balance: 0,
            accNumber: truncatedUuid,
        })
        .then(() => {
            res.status(200).send({ message: 'Customer and Wallet created successfully!' });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};


exports.getCustomers = (req, res) => {
    Customer.findAll({
        include: Wallet
    }).then((customers) => {
        res.status(200).send(customers);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.getCustomersById = (req, res) => {
    const id = req.params.id;
    Customer.findByPk(id, {
        include: Wallet
    }).then((customer) => {
        res.status(200).send(customer);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

exports.updateCustomer = (req, res) => {
    const id = req.params.id;
    const request = req.body;
    Customer.update({
        fullName: request.fullName,
        email: request.email,
        phone_number: request.phone_number,
        address: request.address,
        gender:request.gender,
    }, {
        where: { id: id }
    }).then(() => {
        res.status(200).send({ message: 'Customer updated successfully!' });
    }
    ).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

constdeleteCustomer = (req, res) => {
    const id = req.params.id;
    Customer.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send({ message: 'Customer deleted successfully!' });
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};


