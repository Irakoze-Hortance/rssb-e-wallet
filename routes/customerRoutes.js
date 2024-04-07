const CustomerController=require('../controllers/customerController');
const express = require('express');

const router = express.Router();
router.post('/create', CustomerController.createCustomer);
router.get('/all', CustomerController.getCustomers);
router.get('/get/:id', CustomerController.getCustomersById);
router.put('/update/:id', CustomerController.updateCustomer);
// router.delete('/delete/:id', CustomerController.deleteCustomer);

module.exports = router;