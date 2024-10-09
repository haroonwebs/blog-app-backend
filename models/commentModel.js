import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comments: {
    type: String,
    required: true
    
  },
  commtby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commtPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
},{timestamps:true});


export const commentModel = mongoose.model("Comments", CommentSchema);