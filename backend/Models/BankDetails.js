

const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({

    TotalAmount:{
        type:String,
        default:0
    },
    TotalCustomer:{
        type:String,
        default:0
    }

},
{timestamps: true});

const BankDetail = mongoose.model('BankDetail', bankSchema);

module.exports = BankDetail;