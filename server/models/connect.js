import mongoose from "mongoose"

const mongoURL="mongodb://localhost:27017/githubreact";

const connect=  () => {
        mongoose.connect(mongoURL).
        then(()=>console.log("You'r DB is Connected")).
        catch((err)=>console.log("We caught DB error ",err));
}

export default connect;