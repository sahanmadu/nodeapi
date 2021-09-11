const mongoose = require("mongoose");

const Schema =mongoose.Schema;

const studentSchema = new Schema({
    fullname : {type:String,required:true},
    age :{type:Number, required:true},
    address : {type:String, required:true},
    gender:{type:String,required:true}

})

//send values to database

const Student = mongoose.model("Student",studentSchema);

module.exports=Student;