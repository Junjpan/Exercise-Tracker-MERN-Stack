const express=require("express");
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();

require('dotenv').config();

mongoose.connect(process.env.URL,{useNewUrlParser:true,useCreateIndex:true})
var connection=mongoose.connection;
connection.once("open",()=>{
    console.log("Connected to MongoDB...")
})

var port=process.env.PORT||5000;

//Handler to access the req/res object, in this case it shows the request route
app.use((req,res,next)=>{
    console.log(req.originalUrl)
    next();
})
//Handler for 404 page 
app.use((req,res,next)=>{
   res.status(404).send("There is not such web page!") 
})

//Handler for 500 internal service err
app.use((err,req,res,next)=>{
    console.error(err.stack)
})
app.use(cors());
app.use(bodyParser.json());

const exercisesRouter=require("./routes/exercise.js");
const usersRouter=require("./routes/user.js");

app.use("/exercises",exercisesRouter);
app.use("/users",usersRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

