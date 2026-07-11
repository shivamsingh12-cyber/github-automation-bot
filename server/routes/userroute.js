import express from "express";
import {getGithubLoginPage,getGithubLoginCallback} from "../controllers/auth.controller.js"
import { getGithubRepositories,saveGithubRepository, getConnectedRepositories } from "../controllers/repository.controller.js"
import * as arctic from "arctic"

const router=express.Router();

router.get("/",(req,res)=>{
    res.json('shivam')
});

router.get("/repositories",getGithubRepositories);
router.post("/repositories/connect",saveGithubRepository);
router.get("/github",getGithubLoginPage);
router.get("/repositories/connected", getConnectedRepositories);

router.get("/github/callback",getGithubLoginCallback)

export default router;