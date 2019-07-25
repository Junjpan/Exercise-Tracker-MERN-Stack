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

app.use(cors());
app.use(bodyParser.json());

const exercisesRouter=require("./routes/exercise.js");
const usersRouter=require("./routes/user.js");

app.use("/exercises",exercisesRouter);
app.use("/users",usersRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

