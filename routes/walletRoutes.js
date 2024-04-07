const walletController = require('../controllers/walletController');
const express = require('express');
const router = express.Router();

router.put('/update-wallet/:id', walletController.updateWallet);
router.get('/wallets', walletController.getWallets);
router.get('/wallets/:customerId', walletController.getWalletsByCustomerId);
router.get('/wallet/:id', walletController.getWalletById);
router.delete('/delete-wallet/:id', walletController.deleteWallet);
router.put('/withdraw', walletController.withdraw);
router.put('/deposit', walletController.deposit);

module.exports = router;