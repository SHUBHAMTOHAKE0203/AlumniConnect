// JobSearchApp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Briefcase, MapPin } from 'lucide-react';
import Navbar from './Navbar';

const APP_ID = '3287e74b';
const APP_KEY = import.meta.env.VITE_JOB_SEARCH;


const JobSearchApp = () => {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);

  const searchJobs = async () => {
    try {
      const response = await axios.get('https://api.adzuna.com/v1/api/jobs/us/search/1', {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          what: query,
          where: 'chicago',
          results_per_page: 10,
          'content-type': 'application/json',
        },
      });
      setJobs(response.data.results);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br  bg-white pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-600  mb-6">Find Your Dream Job</h1>
          <p className="text-blue-600 mb-10 text-lg">Search top job listings tailored for you</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full sm:w-[400px] p-4 rounded-full border-2 border-blue-300 bg-white shadow-md text-blue-800 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
            <button
              onClick={searchJobs}
              className="px-6 py-3 rounded-full bg-blue-700 text-white font-bold shadow-lg hover:bg-blue-800 active:scale-95 transition-all duration-300"
            >
               Search
            </button>
          </div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 border border-blue-200 backdrop-blur-md shadow-xl rounded-3xl p-6 transition-transform hover:scale-[1.02] duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-semibold text-blue-900">{job.title}</h2>
                  <span className="text-sm text-blue-600">
                    🗓 {new Date(job.created).toDateString()}
                  </span>
                </div>

                <div className="flex items-center text-blue-700 gap-6 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.company.display_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location.display_name}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-4">{job.description}</p>

                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-blue-900 transition-all"
                >
                  View Job →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearchApp;
