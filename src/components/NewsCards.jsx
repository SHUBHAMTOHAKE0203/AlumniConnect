import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsCards = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_NEWS_KEY; // Replace with your NewsAPI key
  const API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="bg-white min-h-screen py-10 px-5 rounded-md">
    

      {loading ? (
        <p className="text-center text-blue-600">Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles
            .filter(article => article.urlToImage)
            .slice(0, visibleCount)
            .map((article, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-2xl shadow-lg overflow-hidden transition-transform duration-300"
              >
                <img src={article.urlToImage} alt="news" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-black text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-sm mb-4">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
        </div>
      )}

      {!loading && visibleCount < articles.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsCards;
