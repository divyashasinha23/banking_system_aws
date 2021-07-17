const mongoose = require("mongoose");
const Customer = require('../Models/Customer');
const jwt = require('jsonwebtoken');

//jsonwebtoken
const createToken = (id) => {
    return jwt.sign({id}, "customersecretkey" ,{
    expiresIn: '30d'
  });
  }

//Adding new user  
module.exports.add_user = async(req, res) => {
    const{FullName, email} = req.body;
    var password;
    var NewPassword;
    var AccountNumber;
    try {
        password = Math.random().toString(36).slice(-8);
        NewPassword = password;
        AccountNumber = Math.random().toFixed(16).split('.')[1];
        const user = await Customer.create({FullName, email, password, AccountNumber});
        if(user){
            res.status(201).json({
                _id : user._id,
                FullName : user.FullName,
                email: user.email,
                password: user.password,
                AccountNumber : user.AccountNumber,
                NewPassword
            })
        }
    }
    catch(err){
        console.log(err);
    }

}