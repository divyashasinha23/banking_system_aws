const express = require("express");
const router = express.Router();
const CustomerController = require("../Controllers/CustomerContoller");
const CustomerTransfer = require("../Controllers/CustomerTransfer");
const Auth = require('../Middleware/CustomerAuth');

//Authentication
router.post('/customer-signup', CustomerController.customer_signup);
router.post('/customer-login', CustomerController.customer_login);

//Transactions
router.post('/tranfer-amount', Auth, CustomerTransfer.transfer_amount);
router.get('/user-dummy', CustomerTransfer.get_dummy_details)
router.get('/transaction-details',Auth, CustomerTransfer.get_details);

//Display
router.get('/User-details', Auth, CustomerController.user_details);



module.exports = router;