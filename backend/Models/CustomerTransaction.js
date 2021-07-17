const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({

    CustomerAcc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
     },
     AmountCredit:{
         type:Number,
         default: 0
     },
     AmountDebit:{
         type:Number,
         default: 0
     },
     AccountNumber:{
         type:String
     }
    

});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;