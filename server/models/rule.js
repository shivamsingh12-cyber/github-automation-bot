import mongoose from "mongoose";

const rule = new mongoose.Schema({
    keyword:String,
    label:String,
    sendSlack:String
});

const Rule = mongoose.model('rules',rule);

export default Rule;