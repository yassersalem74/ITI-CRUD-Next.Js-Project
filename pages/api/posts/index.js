import Post from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import nc from "next-connect";

// Connect to the database
dbConnect();

const handler = nc().get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(400).json({ message: 'Error fetching posts: ' + error.message }); // Updated error message
  }
}).post(async (req, res) => {
  const { title, imageUrl, details } = req.body;
  const newPost = new Post({ title, imageUrl, details });
  try {
    await newPost.save();
    res.send("new post added");
  } catch (error) {
    console.error("Error adding new post:", error);
    res.status(400).json({ message: 'something went wrong' });
  }
});

export default handler;
