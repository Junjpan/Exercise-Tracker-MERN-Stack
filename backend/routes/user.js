const router=require('express').Router();
let User=require('../models/user');

router.route('/').get((req,res)=>{
    User.find()
        .then(user=>res.json(user))
        .catch(err=>res.status(400).json({"err":err}))
})

router.route('/add').post((req,res)=>{
const user=req.body.user;
const username=new User({user})//equal new User({user:user})
console.log(user);
username.save()
        .then(()=>res.send("User added sucessfully!"))
        .catch(err=>res.status(400).json({"err":err}))
})

module.exports=router;