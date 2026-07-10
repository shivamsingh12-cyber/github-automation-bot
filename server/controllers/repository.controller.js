

export const getGithubRepositories=async  (req, res)=>{
    try {
       

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
        return res.json(data);

    } catch (error) {
        console.log("we caught error in respository controller ",error);
        return res.status(500).json({message:"Server error"});
    }
   



}