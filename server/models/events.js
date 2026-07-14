import mongoose from "mongoose";



const eventSchema = new mongoose.Schema({
     type: String,

    action: String,

    repository: String,

    owner:String,

    sender:String,

    title: String,

        deliveryId: {
    type: String,
    unique: true
},

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
},

    payload: mongoose.Schema.Types.Mixed,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event',eventSchema);

export default Event;