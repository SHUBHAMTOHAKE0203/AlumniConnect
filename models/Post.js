import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: String,
  mediaUrl: String,
  mediaType: String,
  likes: Number,
  comments: [{ text: String }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;