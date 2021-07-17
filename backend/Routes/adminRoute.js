const express = require("express");
const router = express.Router();
const AdminAuth = require("../Middleware/AdminAuth");
const AdminController = require('../Controllers/Admincontroller');
const AddUser = require('../Controllers/AddUser');

router.post('/admin-signup', AdminController.admin_signup);
router.post('/admin-login', AdminController.admin_login);

//Add-New-user
router.post('/add-new-user',AdminAuth, AddUser.add_user);

//View User
router.get('/All-Users', AdminAuth, AdminController.all_user);
router.get('/bank-details', AdminAuth, AdminController.bank_details);

//credit Amount
router.post('/Credit', AdminAuth, AdminController.credit_amount);

//debit Amount
router.post('/Debit', AdminController.debit_amount);

module.exports = router;