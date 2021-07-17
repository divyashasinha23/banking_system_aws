const mongoose = require('mongoose');
const Customer = require('../Models/Customer');
const Transfer = require('../Models/CustomerTransaction');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Error Handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error;


  if(err.message === "Invalid Details"){
    error = "Email or Password incorrect";
   
  }

  if(err.message === "Insufficient Balance"){
    error = "Balance Insufficient "
  }


  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return error;
}



//Credit & Debit Amount
module.exports.transfer_amount = async(req,res) => {
   
     var{AmountDebit, AccountNumber} = req.body;
     var remaining;
     var increase;
     var SenderAccountNumber
    //  var AccountNumber
     var AmountCredit;
     var CustomerAcc;

     try{
        const sendercustomer = await Customer.findById(req.customer._id);
        CustomerAcc = req.customer._id
        if(sendercustomer.TotalBalance > AmountDebit){
        SenderAccountNumber = sendercustomer.AccountNumber;
        if(sendercustomer){
         const customerTrans = await Transfer.create({AmountDebit, AccountNumber, CustomerAcc});
        //  AccountNumber = ReceiverAccountNumber;
         const receivercustomer = await Customer.findOne({AccountNumber});
         if(customerTrans){
                 res.status(201);
                 res.json({
                     msg: "Successful transaction",
                     AmountDebit: customerTrans.AmountDebit,
                     AccountNumber: customerTrans.AccountNumber,
                     CustomerAcc   
                     
                 });
                //  console.log(sendercustomer.TotalBalance);
                 remaining = sendercustomer.TotalBalance - AmountDebit;
                
                 await Customer.findOneAndUpdate({_id: req.customer},{
                     TotalBalance : remaining
                  });    
                  
                 increase = receivercustomer.TotalBalance + AmountDebit;

                 await Customer.findOneAndUpdate({AccountNumber}, {
                    TotalBalance : increase
                });
                 
                
                 AmountCredit = AmountDebit;
                 CustomerAcc = receivercustomer._id;
                 AccountNumber = sendercustomer.AccountNumber;

                 await Transfer.create({AmountCredit, AccountNumber, CustomerAcc });
                         
         }
        }
        else{
            console.log("user not found");
        }
      }
      else{
         res.status(401);
         throw Error("Insufficient Balance");
      }
     }
     catch(err){
      const error = handleErrors(err);
      res.status(400).json({error});
     }

}

//Transaction details
module.exports.get_details = async(req,res) => {

    try{
        
            const Detail = await Transfer.find({CustomerAcc: req.customer._id});
            if(Detail){
                res.status(200);
                res.json({
                   Detail
                })
            }
        
        else{
            console.log("Not Found");
        }
        
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports.get_dummy_details = async(req,res) => {
    try{
    const users = await Customer.find();
    if(users.length !== 0){
      res.status(200).json({
       users,
       count: users.length
      });
    }
    else{
      res.status(200).json({
        msg: "No User Exist"
      });
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      msg: 'Server Error'
    });
  }
  }
