import mongoose from "mongoose";

 const userScheema = new mongoose.Schema({

   username: {
     type: String,
     required: true,
   },

   email: {
     type: String,
     required: true,
   },

   password: {
     type: String,
     required: true,
   },

   role: {
     type: String,
     required: true,
     enum: ["teacher", "student"],
   }

 },
 {timestamps:true});


 export const UserModel = mongoose.model("User", userScheema);