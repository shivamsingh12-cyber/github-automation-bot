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
      return res.redirect("/login");
   }

   if(!code || !state || !storedState || state != storedState){
      return handleFailedLogin();
   }

   let tokens;
   try {
      tokens=await github.validateAuthorizationCode(code);
   } catch {
      return handleFailedLogin();
   }

   const githubUserResponse = await fetch(`https://api.github.com/user`,{
      headers:{
         Authorization: `Bearer ${tokens.accessToken()}`,
      },
   });

   if(!githubUserResponse.ok) return handleFailedLogin();
   const githubUser=await githubUserResponse.json();
   const {id:githubUserId,name}=githubUser;

   const githubEmailResponse=await fetch("https://api.github.com/user/emails",{
      headers:{
         Authorization: `Bearer ${tokens.accessToken()}`,
      },
   });

   if(!githubEmailResponse.ok) return handleFailedLogin();

   const  emails = await githubEmailResponse.json();
   const email = emails.filter((e)=>e.primary)[0].email;

   if(!email) return handleFailedLogin();

   let user = await getUserWithOauthID({
      provider:"github",
      email,
   })

   if(user && !user.providerAccountId){
      await linkUserWithOauth({
         userId:user.id,
         
      })
   }
}