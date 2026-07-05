import express from "express";
import cors from "cors"
import user from "./routes/userroute.js"
const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/",user);


app.listen(5000,()=>console.log('You are up'))