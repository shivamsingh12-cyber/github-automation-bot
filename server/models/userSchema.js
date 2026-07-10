import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
       githubId: {
        type: String,
        unique: true
    },
    name:String,
    email:String,
    avatar:String
});

const User = mongoose.model('Users',UserSchema);

export default User;