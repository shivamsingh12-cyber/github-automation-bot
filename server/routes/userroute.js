import express from "express";
import {getGithubLoginPage,getGithubLoginCallback} from "../controllers/auth.controller.js"
import {githubWebhookHandler} from "../controllers/webhook.controller.js"
import { getGithubRepositories,saveGithubRepository, getConnectedRepositories} from "../controllers/repository.controller.js"
import * as arctic from "arctic"

const router=express.Router();

router.get("/",(req,res)=>{
    res.json('shivam')
});

// POST request
router.post("/repositories/connect",saveGithubRepository);
router.post("/api/webhook",githubWebhookHandler);

// GET request
router.get("/repositories",getGithubRepositories);
router.get("/github",getGithubLoginPage);
router.get("/repositories/connected", getConnectedRepositories);

router.get("/github/callback",getGithubLoginCallback)

export default router;