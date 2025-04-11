import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from './models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded media

// MongoDB Connection
mongoose.connect('mongodb+srv://Vaishnavi:Vaish123@cluster0.wldlwib.mongodb.net/postApp')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${Date.now()}-${cleanName}`);
  }
});
const upload = multer({ storage });

// CREATE POST
app.post('/api/posts', upload.single('media'), async (req, res) => {
  try {
    let mediaType = null;
    let mediaUrl = null;

    if (req.file) {
      const mime = req.file.mimetype;
      if (mime.startsWith('video')) mediaType = 'video';
      else if (mime.startsWith('image')) mediaType = 'image';
      else mediaType = 'document';

      mediaUrl = `/uploads/${req.file.filename}`;
    }

    const newPost = new Post({
      content: req.body.content,
      mediaUrl,
      mediaType,
      likes: 0,
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET ALL POSTS
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// LIKE A POST
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADD COMMENT
app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ text });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// EDIT POST CONTENT
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { content }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE POST + MEDIA FILE
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Remove media file if it exists
    if (post.mediaUrl) {
      const filePath = path.join(__dirname, post.mediaUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
