import { generateState } from "arctic";
import { github } from "../lib/oauth/github.js";
import User from "../models/userSchema.js"

export const getGithubLoginPage=  (req, res)=>{
   //  if(req.user) return res.redirect("/");

    const state = generateState();
   const url = github.createAuthorizationURL(state, [
    "repo",
    "user:email"
]);

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
   const accessToken = tokens.accessToken();

   const githubUserResponse = await fetch(`https://api.github.com/user`,{
      headers:{
         Authorization: `Bearer ${accessToken}`,
      },
   });

   if(!githubUserResponse.ok) return handleFailedLogin();
   const githubUser=await githubUserResponse.json();


   
   const {id:githubId,name,avatar_url:avatar,login}=githubUser;

//  console.log(tokens.accessToken());

    const cookieConfig={
        httpOnly:true,
        secure:false,
        sameSite:"lax",
     }

 res.cookie("github_access_token",accessToken,cookieConfig);


   const githubEmailResponse=await fetch("https://api.github.com/user/emails",{
      headers:{
         Authorization: `Bearer ${accessToken}`,
      },
   });

   if(!githubEmailResponse.ok) return handleFailedLogin();

   const  emails = await githubEmailResponse.json();

  const primaryEmail = emails.find(e => e.primary);

if (!primaryEmail) {
    return handleFailedLogin();
}

const email = primaryEmail.email;

   try {
      console.log("Before finding user");
           const existingUser= await User.findOne({githubId});

   if(existingUser){
      console.log("Existing User:", existingUser);
        console.log("Inside existing user block");

  existingUser.login = login;
    existingUser.name = name;
    existingUser.email = email;
    existingUser.avatar = avatar;
    existingUser.accessToken = accessToken;

    await existingUser.save();

      res.cookie("app_user_id",String(existingUser._id),cookieConfig)
          console.log("Cookie should be set now");

      return res.json({
    success: true,
    user: existingUser
   });
}


const data = {
   githubId,
   login,
   name,
   email,
   avatar,
   accessToken,
};
const setUser= new User(data);
const DBuser= await setUser.save();
console.log("Inside new user block");
res.cookie("app_user_id", String(DBuser._id), cookieConfig);
console.log("Cookie should be set now");

      return res.json({
      success:true,
       user: DBuser
   })
   } catch (error) {
      console.log("we caught error ", error);
      res.status(500).json({message:"We caught DB Error"})
   }
}