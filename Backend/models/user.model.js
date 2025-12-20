const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            minlength:[2,'First name must be at least 2 characters long'],
        },
        lastname:{
            type:String,
            minlength:[2,'Last name must be at least 2 characters long']
        }
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        select:false,
    },
    soketId:{
        type:String,
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const User = mongoose.model('user',userSchema);

module.exports = UserModel; 