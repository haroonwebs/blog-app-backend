import { commentModel } from "../models/commentModel.js";


export const postComments = async(req, res) => {
    try {
        const { comments, commtby, commtPost } = req.body; 

        const commt = await commentModel.create({
            comments,
            commtby,
            commtPost
        })
        return res.status(200).json({
            success:true,
            message:"message sent successfully",
            commt
        })

        
    } catch (error) {
        console.log(error);
        return res.status(403).json({success:false, message:"internal server error"})
    }
}



export const getAllcomments = async (req, res) => {
  try {
    const { postId } = req.params;

    const Comments = await commentModel
      .find({ commtPost: postId })
      .populate(["commtby", "commtPost"])
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Comments for the post",
      Comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
