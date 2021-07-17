const mongoose = require("mongoose");
const Customer = require("../Models/Customer");
const jwt = require('jsonwebtoken');

//jsonwebtoken
const createToken = (id) => {
    return jwt.sign({id}, "customersecretkey" ,{
    expiresIn: '30d'
  });
  }


//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error;


  if(err.message === "Invalid Details"){
    error = "Email or Password incorrect";
   
  }


  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return error;
}


  
//Customer Signup
module.exports.customer_signup = async(req,res) => {

    const{FullName, email, password, AccountNumber, TotalBalance} = req.body;

    try{
        const customer = await Customer.create({FullName, email, password, AccountNumber, TotalBalance});
        if(customer){
            const token = createToken(customer._id);
            res.status(201);
            res.json({
                _id: customer._id,
                FullName: customer.FullName,
                email: customer.email,
                password: customer.password,
                AccountNumber: customer.AccountNumber,
                TotalBalance: customer.TotalBalance,
                token: token,
                
            });
            
            

        }
        else{
            res.status(400);
            throw new Error ('Invalid details');   
           }
    }
    catch(err){
        console.log(err);
    }
} 


//Customer Login
module.exports.customer_login = async(req,res) => {
    const{password, email} = req.body;

    try{
        const customer = await Customer.login(email,password);
        if(customer){
            const token = createToken(customer._id);
            res.status(200);
            res.json({
                customer,
                token:token
            })
        }
    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({error});
      }
}


//User profile Details
module.exports.user_details = async(req, res) => {

    try{
    const customer = await Customer.findById(req.customer);
     if(customer){
         res.status(200).json({
             customer
            // _id : customer._id,
            // FullName: customer.FullName, 
            // AccountNumber: customer.AccountNumber,
            // TotalBalance: customer.TotalBalance,
         });
     }
    }
    catch(err){
        console.log(err);
    }
}

