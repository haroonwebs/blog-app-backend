import { UserModel } from "../models/UserModel.js"


export const getAllusers = async ( req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({success: true,
            users
        })
       
    } catch (error) {
     return res.status(400).json({message: "internal server error"})
    }
}


export const deleteUser = async (req, res) => {

  try {
      const userid = req.params.id;
      const user = await UserModel.findById(userid)
      if(!user){
        return res.status(404).json({ message: "user not found", success: false})
      }
      if(user.role == "teacher" ){
        return res.status(404).json({
            success:false,
            message:"Teacher do not delete itself"
        })
      }
      
      const deleUser = await UserModel.findByIdAndDelete(userid);
      if(!deleUser)
     { 
      return res.status(404).json({
        success: fasle,
        message:"user not found",
        
      })}

       return res
         .status(200)
         .json({ message: "user deleted successful", deleUser });

  } catch (error) {
    return res.status(400).json({ message: "internal server error" });
  }
}