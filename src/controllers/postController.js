
import Post from "../models/post"
import { Types } from "mongoose";


export const PostController = {

  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  createPost: async (req, res) => {

    try {
      const { title, file, likes } = req.body;
      console.log(req.body);
     

      if (!(title && file)) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      const newPost = new Post({
        title,
        likes,
        file,
      });

      const savedPost = await newPost.save();

      res.status(201).json({
        message: 'Post created successfully',
        post: savedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  updatePost: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send('No post with that id');
    }
    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedPost);
  },


  deletePost: async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send('No post with that id');
    }

    try {
      await Post.findByIdAndDelete(id);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting the post', error: error.message });
    }
  },

  likePost: async (req, res) => {
    const { id } = req.params;



    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).send('No post with that id');
    }
    const likedPost = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    res.json(likedPost.likes);
  },


  //   getPostsBySearch : async (req, res) => {

  //     const { searchQuery } = req.query;

  //     try {
  //         const title = new RegExp(searchQuery, "i");

  //         const posts = await Post.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

  //         res.json({ data: posts });
  //     } catch (error) {    
  //         res.status(404).json({ message: error.message });
  //     }

  //   },

  //   getSiglePost : async (req, res) => {
  //     const { id } = req.params;
  //     try {
  //       const post = await Post.findById(id);
  //       res.status(200).json(post);
  //     } catch (error) {
  //       res.status(404).json({ message: error.message });
  //     }
  //   },

};

