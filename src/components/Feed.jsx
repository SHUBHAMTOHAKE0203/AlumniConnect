import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts`);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError('Something went wrong. Try later.');
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith('image')) {
        setMediaType('image');
        setPreview(URL.createObjectURL(selectedFile));
      } else if (fileType.startsWith('video')) {
        setMediaType('video');
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setMediaType('document');
        setPreview(selectedFile.name);
      }
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (file) formData.append('media', file);
    try {
      await axios.post(`${API_BASE_URL}/api/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setContent('');
      setFile(null);
      setPreview(null);
      setMediaType(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axios.post(`${API_BASE_URL}/api/posts/${postId}/comment`, { text: comment });
      fetchPosts();
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, { method: 'DELETE' });
      if (res.status === 204) fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-10 px-4 sm:px-8">
      {/* Create Post Card */}
      <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/70 shadow-2xl border border-blue-200 p-6 rounded-3xl mb-10">
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something amazing..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3 text-gray-800"
            rows={4}
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-3 text-sm text-gray-600"
          />
          {preview && (
            <div className="mb-3">
              {mediaType === 'image' && <img src={preview} alt="preview" className="rounded-xl max-h-64" />}
              {mediaType === 'video' && <video src={preview} controls className="rounded-xl max-h-64" />}
              {mediaType === 'document' && <p className="text-gray-600">📄 {preview}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Post
          </button>
        </form>
      </div>

      {/* Feed Title */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700">Alumni Feed</h1>
        <p className="text-gray-600">See what's new in the community</p>
      </div>

      {/* Feed Posts */}
      <div className="max-w-2xl mx-auto space-y-6">
        {loading ? (
          <p className="text-center text-blue-500">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Be the first!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/80 shadow-lg backdrop-blur-sm border border-gray-200 rounded-3xl p-5"
            >
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{new Date(post.createdAt).toLocaleString()}</span>
                <div className="space-x-3">
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                  {post.mediaUrl && (
                    <a
                      href={`${API_BASE_URL}${post.mediaUrl}`}
                      download
                      className="text-blue-600 hover:underline"
                    >
                      ⬇ Download
                    </a>
                  )}
                </div>
              </div>

              <p className="text-lg text-gray-800 mb-3">{post.content}</p>

              {post.mediaUrl && (
                <div className="rounded-xl overflow-hidden mb-3">
                  {post.mediaType === 'image' && (
                    <img src={`${API_BASE_URL}${post.mediaUrl}`} alt="Post" className="w-full" />
                  )}
                  {post.mediaType === 'video' && (
                    <video controls className="w-full rounded-md">
                      <source src={`${API_BASE_URL}${post.mediaUrl}`} />
                    </video>
                  )}
                  {post.mediaType === 'document' && (
                    <a
                      href={`${API_BASE_URL}${post.mediaUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      📄 View Document
                    </a>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-600">
                <button
                  onClick={() => handleLike(post._id)}
                  className="hover:text-blue-600 flex items-center space-x-1"
                >
                  👍 <span>Like ({post.likes || 0})</span>
                </button>
                <span>💬 {post.comments?.length || 0} comment{post.comments?.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Comments */}
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                {post.comments?.map((comment, idx) => (
                  <p key={idx} className="border-l-4 border-blue-200 pl-3">{comment.text}</p>
                ))}
              </div>

              {/* Comment input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value.trim();
                  if (comment) {
                    handleComment(post._id, comment);
                    e.target.reset();
                  }
                }}
                className="mt-2"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                />
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
