import { postModel } from "../models/postModel.js";

export const uploadPost = async (req, res) => {
  try {
    const { description, postedBy } = req.body;
    const file = req.file.filename;

    const store = await postModel.create({
      postedBy,
      file,
      description,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      store,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Posts not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All posts retrieved",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const delPost = await postModel.findByIdAndDelete(id);
    console.log(delPost);
    if (!delPost) {
      return res
        .status(404)
        .json({ success: false, message: "Error during post deletion" });
    }
    return res.status(200).json({
      success: false,
      message: "POST DELETED SUCCESSFULLY",
      delPost,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "internal server error" });
  }
};
