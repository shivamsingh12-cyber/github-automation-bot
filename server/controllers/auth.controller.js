import { generateCodeVerifier, generateState } from "arctic";
import { github } from "../lib/oauth/github.js";

export const getGithubLoginPage= async (req, res)=>{
    if(req.user) return res.redirect("/");

    const state = generateState();
    const url=github.createAuthorizationURL(state,["user:email"])

     const cookieConfig={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
     }

     res.cookie("github_oauth_state",state,cookieConfig);
     res.redirect(url.toString());
}

export const getGithubLoginCallback= async (req,res)=>{
   const {code,state}=req.query;

   const {github_oauth_state:storedState}=req.cookies;

   function handleFailedLogin() {
      req.flash(
         "error",
         "Couldn't login with Github because of invalid login please try again!"
      )
   }
}