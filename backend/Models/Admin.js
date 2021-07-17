const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({

    Username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    TotalAmount:{
       type: String
    },
    TotalCustomer:{
        type: String
    }
});

adminSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

//login
adminSchema.statics.login = async function(Username, password){
    const admin = await this.findOne({Username});
    if (admin){
  const auth = await bcrypt.compare(password, admin.password);
  if(auth){
      return admin;
  }
  throw new Error('incorrect password');
    }
    throw new Error('invalid username');
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;