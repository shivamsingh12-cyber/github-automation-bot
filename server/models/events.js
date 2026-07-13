import mongoose from "mongoose";



const eventSchema = new mongoose.Schema({
     type: String,

    action: String,

    repository: String,

    title: String,

    payload: mongoose.Schema.Types.Mixed,

    deliveryId: {
    type: String,
    unique: true
},
    status: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event',eventSchema);

export default Event;