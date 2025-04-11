import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import Navbar from './Navbar';
const categories = [
  "Web Development",
  "Web3",
  "DSA",
  "Machine Learning",
  "Mobile Development"
];

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const YouTubeCategoryVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState("Web Development");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  const fetchVideos = async (category, pageToken = '') => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            q: category,
            type: 'video',
            maxResults: 6,
            pageToken,
            key: API_KEY,
          },
        }
      );
      setVideos(prev => pageToken ? [...prev, ...res.data.items] : res.data.items);
      setNextPageToken(res.data.nextPageToken || null);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos(selectedCategory);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    if (nextPageToken) {
      fetchVideos(selectedCategory, nextPageToken);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-5 flex justify-center items-center gap-2">
        Curated YouTube Picks
        </h1>
        <p className=' text-xl text-center text-gray-800 mb-5 flex justify-center items-center gap-1'>Discover handpicked YouTube videos recommended by our alumni</p>
        

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2.5 text-sm font-medium rounded-full shadow-md hover:scale-105 transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setNextPageToken(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={video.id.videoId || video.etag}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all border border-gray-200"
            >
              <iframe
                className="w-full h-56 rounded-lg"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allowFullScreen
              />
              <h2 className="text-lg font-semibold mt-4 text-gray-800">
                {video.snippet.title}
              </h2>
              <p className="text-sm text-gray-600">
                {video.snippet.channelTitle}
              </p>
            </motion.div>
          ))}
        </div>

        {nextPageToken && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full font-medium shadow-lg transition duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default YouTubeCategoryVideos;