import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const navigate = useNavigate();

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

  const handlePost=async()=>{
    navigate('/feed')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    if (file) formData.append('media', file);

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setContent('');
      setFile(null);
      setPreview(null);
      setMediaType(null);
      onPostCreated(response.data);
      
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border rounded-md p-2 mb-2"
        rows={3}
      />
      <input type="file" onChange={handleFileChange} className="mb-2" />

      {preview && (
        <div className="mb-2">
          {mediaType === 'image' && (
            <img src={preview} alt="Preview" className="max-h-64 rounded-md" />
          )}
          {mediaType === 'video' && (
            <video src={preview} controls className="max-h-64 rounded-md" />
          )}
          {mediaType === 'document' && (
            <p className="text-sm text-gray-600">📄 {preview}</p>
          )}
        </div>
      )}

      <button
      onClick={handlePost}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;