import mongoose from "mongoose";


const postSchema = new mongoose.Schema({

    file :{
        type: String,
        required: true  
    },

    description :{
        type : String,
        required: false
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})

export const postModel = mongoose.model("Post", postSchema);