import mongoose from "mongoose";

const document=mongoose.Schema({
    _id:String,
    data:Object
})

const Document=mongoose.model('document',document);
export default Document;