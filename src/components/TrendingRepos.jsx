import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Star, Github, Code2, CalendarDays } from 'lucide-react';
import Navbar from './Navbar';

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchRepos = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10&page=${page}`
      );
      const data = await response.json();
      setRepos(prev => (isLoadMore ? [...prev, ...data.items] : data.items));
    } catch (err) {
      console.error('Error fetching GitHub repos:', err);
    } finally {
      if (!isLoadMore) setLoading(false);
      if (isLoadMore) setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage(prev => {
      const nextPage = prev + 1;
      fetch(
        `https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10&page=${nextPage}`
      )
        .then(res => res.json())
        .then(data => {
          setRepos(prevRepos => [...prevRepos, ...data.items]);
          setLoadingMore(false);
        });
      return nextPage;
    });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-12">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-5">Trending GitHub Repositories</h1>
      <p className='text-xl text-center text-slate-800 mb-10'>Explore the hottest repositories developers are loving right now ~ from cutting-edge tools to open-source goldmines. Stay ahead, stay inspired.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {(loading ? Array(6).fill({}) : repos).map((repo, i) => (
          <motion.div
            key={repo.id || i}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 shadow-md rounded-3xl p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {loading ? (
              <>
                <Skeleton height={30} width="60%" />
                <Skeleton count={2} className="my-2" />
                <div className="flex gap-4 mt-4">
                  <Skeleton circle height={30} width={30} />
                  <Skeleton width="40%" />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-blue-700 hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">{repo.description || 'No description'}</p>
                  </div>
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="w-12 h-12 rounded-full border-2 border-white shadow"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    {repo.stargazers_count.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Github size={16} /> {repo.owner.login}
                  </span>
                  <span className="flex items-center gap-1">
                    <Code2 size={16} />
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {repo.language || 'N/A'}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    {new Date(repo.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {!loading && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-900 transition"
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading More...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default TrendingRepos;
