const express = require("express");
const app = express();
app.use(express.static('public'))
app.use(express.json());
const userRoute  = express.Router();
const authRoute = express.Router();

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
userRoute
    .route('/')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

userRoute
    .route(':/id')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

authRoute
    .post('/signup',setCreatedAt,signUpUser)
    .post('/login',loginUser);

let user = [];
function getUser(req,res){
    console.log("users");
    res.json(user);
}
function createUser(req,res){
    user = req.body;
    res.status(200).send("data recieved and user added");
}
function updateUser(req,res){
    let obj = req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.send(200).json(user);
}
function deleteUser(req,res){
    user ={}
    res.status(200).json(user);
}

function setCreatedAt(req,res,next){
    req.body.setCreatedAt = new Date().toISOString();
    next();
}

function signUpUser(req,res){
    let {email,password,name} = req.body;
    console.log("user",req.body);
    user.push({
        email,name,password
    })
    res.status(200).json({
        message: "user created",
        createdUser : req.body
    })
}
function loginUser(req,res){

}


app.listen(8080,function (){
    console.log("server started");
})