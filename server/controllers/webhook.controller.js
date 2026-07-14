import Event from "../models/events.js"

export const githubWebhookHandler = async (req,res) => {
   try {
     const type=req.headers["x-github-event"];
     const deliveryId=req.headers["x-github-delivery"];

     const action = req.body.action;
     const repository = req.body.repository?.name;

     const owner = req.body.repository?.owner?.login;
     const sender = req.body.sender?.login;
    const title =
    req.body.issue?.title ||
    req.body.pull_request?.title ||
    null;

    const existingEvent = await Event.findOne({ deliveryId });

if (existingEvent) {
    return res.status(200).json({
        message: "Event already processed"
    });
}

           const event = new Event({
        type,
        action,
        repository,
        owner,
        sender,
        title,
        payload:req.body,
        deliveryId,
     });

     await event.save();
    
    

   if(type=="issues" && action==="opened"){
      
      const issueNumber = req.body.issue.number;
      //get Token
const user = await User.findOne({ login: owner });
const accessToken = user.accessToken;
//call github
      const callGithub=await fetch(`https://api.github.com/repos/${owner}/${repository}/issues/${issueNumber}/comments`,{
   method:"POST",
   headers:{
      Authorization:`Bearer ${getAccessToken}`,
       "Content-Type": "application/json"
   },
   body: JSON.stringify({
    body: "Thanks for opening this issue! We'll look into it."
   })
   
})
const result = await callGithub.json();

console.log(result);

if (!callGithub.ok) {
    console.log("Comment Adding error");
} 
   }
    return res.status(200).json({message:"Webhook received and saved and called Github"})
     } catch (error) 
      {
         console.log("error in webhook: ",error);
          return res.status(500).json({message:"Internal Server error in webhook"})
      }
}

