import express from "express";

const router=express.Router();

router.get("/",(req,res)=>{
    res.json('shivam')
});

export default router;