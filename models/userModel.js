const mongoose = require("mongoose")

let {DB_LINK} = require("./secrets") 

mongoose.connect(DB_LINK).then(function(db){
    console.log("Success");
}).catch(function(err){
    console.log("err",err);
})

const userSchema  = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 8,
        required: true
    },
    confirmPassword:{
        type: String,
        minlength: 8,
        required: true,
        validate: function(){
            return this.password==this.confirmPassword
        }
    }
})

const userModel =  mongoose.model("userModel",userSchema)

(async function createUser() {
    let userObj  = {
        name : "chetan",
        email: "abc@abc.com",
        password: "12345678",
        confirmPassword: "12345678"
    }
    let user = await userModel.create(userObj);
    console.log(user);
})();