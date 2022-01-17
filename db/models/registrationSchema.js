const mongoose = require('mongoose');
const bcrypt= require('bcrypt');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
   
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10

    },
    age: {
        type: Number,
        required: true

    },
    address:{
        type:String,
        required:true,
    },
    userPassword: {
        type: String,
        required: true
    },
    userConfirmPassword: {
        type: String,
        required: true
    },
})
customerSchema.pre("save",async function(next){
    if(this.isModified("userPassword")){
        console.log(this.userPassword);
        this.userPassword=await bcrypt.hash(this.userPassword,10);
        this.userConfirmPassword=undefined;
    }
    next();
})

const Customer = new mongoose.model("Customer", customerSchema);

module.exports = Customer;