const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {isEmail} = require('validator');

const customerSchema = new mongoose.Schema({

    FullName:{
        type: String,
        required: true
    },
    AccountNumber:{
        type:String,
    },
    TotalBalance:{
        type: Number,
        required: true,
        default: 0,
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        validate: [isEmail, 'Please enter a valid email']
    },
},
{timestamps: true});

//bcrypting password
customerSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

//login
customerSchema.statics.login = async function(email, password){
    const customer = await this.findOne({email});
    if (customer){
  const auth = await bcrypt.compare(password, customer.password);
  if(auth){
      return customer;
  }
    }
    
    throw Error('Invalid Details');
}


const Customer= mongoose.model('Customer', customerSchema);

module.exports = Customer;