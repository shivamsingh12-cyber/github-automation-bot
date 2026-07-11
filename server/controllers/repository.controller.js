import Repository from "../models/repository.js";
import User from "../models/userSchema.js";

export const getGithubRepositories=async  (req, res)=>{
    try {
       console.log(req.cookies);

         const accessToken= req.cookies.github_access_token;
         console.log("Access Token:", accessToken);

         if(!accessToken) return res.status(401).json({message:"No access token"});

        const response=await fetch("https://api.github.com/user/repos",{
            headers:{
                Accept:"application/vnd.github+json",
               "User-Agent": "Git-React-App",
                Authorization: `Bearer ${accessToken}`,
            }
        })

        if(!response.ok) {
            const errorText=await response.text();
            return res.status(response.status).json({
                message:"Github request failed",
                error:errorText
            });
        }

        const data= await response.json();
        const repositories=data.map((repo)=>{
            return {
                id:repo.id,
                name:repo.name,
                fullName:repo.full_name,
                owner:repo.owner.login,
                private:repo.private,
                description:repo.description,
            }
        })
        return res.json(repositories);

    } catch (error) {
        console.log("we caught error in respository controller ",error);
        return res.status(500).json({message:"Server error"});
    }
}

export const saveGithubRepository=async  (req, res)=>{
    try {
       console.log("Connect repository controller hit");

console.log(req.body);
        const userId = req.cookies.app_user_id
         if (!userId) return res.status(401).json({ message: "Not logged in" });
  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ message: "User not found" });

    const {repoId,repoName,fullName, owner, private:isPrivate}= req.body;
    const existingRepo= await Repository.findOne({userId,repoId});
    if(existingRepo){
        return res.status(409).json({message:"repository already connected"});
    }
        const repo=await Repository.create({
            userId,
            repoId,
            repoName,
            fullName,
            owner,
            private:isPrivate
        })
     
        return res.status(201).json({message:"you repo is connected"});

    } catch (error) {
        console.log("we caught error in respository ",error);
        return res.status(500).json({message:"Server error"});
    }
}

export const getConnectedRepositories = async (req, res) => {
  try {
    const userId = req.cookies.app_user_id;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const repos = await Repository.find({ userId }).select("repoId");
    return res.json(repos);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};