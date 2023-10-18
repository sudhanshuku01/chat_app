
import mongoose from "mongoose";
const connect=async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/schatapp');
        console.log("DB Connected")
      } catch (error) {
        handleError(error);
    }
}
export default connect;