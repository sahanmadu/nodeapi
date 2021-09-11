const router = require("express").Router();
let Student= require("../models/Student");

router.route("/add").post((req,res)=>{
    const fullname=req.body.fullname;
    const age=Number(req.body.age);
    const address=req.body.address;
    const gender=req.body.gender;

    //create a js object and sent to database

    const newStudent=new Student({
        fullname,
        age,
        address,
        gender
    })

    //pass data via Schema as document 
    //js promise

    newStudent.save().then(()=>{
        res.json("New student is added"); // send messege as a json format to frontend
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})

//update feature using async await function 

router.route("/update/:id").put(async(req,res)=>{
    let sid=req.params.id;  // fetch parameter id comes with url

    //destructure feature (2nd way)

    const {fullname,age,address,gender} = req.body; 

    //create an object to update values

    const updateStudent = {
        fullname,
        age,
        address,
        gender
    }

    const update = await Student.findByIdAndUpdate(sid,updateStudent).then(()=>{
        res.status(200).send({status:"User successfully updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error when updating user data"});
    })

    

})

router.route("/delete/:id").delete(async(req,res)=>{
    let nid=req.params.id;

    await Student.findByIdAndDelete(nid).then(()=>{
        res.status(200).send({status:"User deleted successfully"})
    }).catch((err)=>{
        console.log(err);
    })

    
})

//get only one user details
router.route("/get/:id").get(async(req,res)=>{
    let sid= req.params.id;

   const user= await Student.findById(sid).then((student)=>{
        res.status(200).send({status:"User fetched", student})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error"});
    })
})


module.exports=router;