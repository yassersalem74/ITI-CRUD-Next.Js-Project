import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import nc from "next-connect";

// Connect to the database
dbConnect();

const handler = nc()
  .delete(async (req, res) => {
    try {  
      await Post.findOneAndDelete({ _id: req.query.id });
      res.send("Deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(400).json({ message: "Something went wrong" });
    }
  })
  .put(async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.query.id });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      post.title = req.body.title;
      post.imageUrl = req.body.imageUrl;
      post.details = req.body.details;
      await post.save();
      res.send("Updated");
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(400).json({ message: "Something went wrong" });
    }
  }).get(async (req, res) => {
    try {
      const post = await Post.findOne({_id : req.query.id});
      res.send(post);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(400).json({ message: 'Error fetching posts: ' + error.message }); // Updated error message
    }
  });

export default handler;
