import mongoose from "mongoose";


const repo = new mongoose.Schema({
    owner:String,
    reponame:String,
    repoId:String
});

const Repository = mongoose.model('repos',repo);

export default Repository;