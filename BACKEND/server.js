const express = require("express"); //framework
const mongoose = require("mongoose");  // mongo db dependency
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

// create a server port
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

//get database link 

const URL= process.env.MONGODB_URL;

//set configurations (options)
/*
mongoose.connect(URL,{
useCreateIndex: true,
useNewUrlParser:true,
useUnifiedTopologyL:true,
useFindAndModify:false
});
*/

mongoose.connect(URL,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

//create connection

const connection = mongoose.connection;

//open connection with an event
connection.once("open", ()=>{
    console.log("Your db connection is success now!");
})



//access to students.js file

const studentRouter= require("./routes/students.js");
app.use("/student",studentRouter);

//load app in the port 8070

app.listen(PORT,()=>{
    console.log(`Server is ruuning on port: ${PORT}`)
})





