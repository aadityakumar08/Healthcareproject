const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(()=>{
    console.log("Connection succesful");
}).catch((err)=>{
    console.log(`No connection ${err}`)
})

const signupsch = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
    })
const Student = mongoose.model("Register", signupsch);
module.exports = Student;