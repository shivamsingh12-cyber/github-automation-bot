import express from "express";
import {getGithubLoginPage,getGithubLoginCallback} from "../controllers/auth.controller.js"
import * as arctic from "arctic"

const router=express.Router();

router.get("/",(req,res)=>{
    res.json('shivam')
});

router.get("/github",getGithubLoginPage);

router.get("/github/callback",getGithubLoginCallback)

export default router;