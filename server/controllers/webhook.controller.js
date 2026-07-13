import Event from "../models/events.js"

export const githubWebhookHandler = async (req,res) => {
     const type=req.headers["x-github-event"];
     const deliveryId=req.headers["x-github-delivery"];
     const action = req.body.action;
     const repository = req.body.repository?.name;
    const title =
    req.body.issue?.title ||
    req.body.pull_request?.title ||
    null;

     const event = new Event({
        type,
        action,
        repository,
        title,
        payload:req.body,
        deliveryId,
        status: "pending"
     });

     await event.save();

     return res.status(200).json({message:"Webhook received"})

}