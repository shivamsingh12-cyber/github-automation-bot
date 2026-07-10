import mongoose from "mongoose";


const event = new mongoose.Schema({
    type:String,
    payload:String,
    repo:String,
    status:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Event = mongoose.model('Events',event);

export default Event;