import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Clock8, ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const HackathonList = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("https://clist.by/api/v2/contest/", {
          params: {
            username: "shubh23",
            api_key:  import.meta.env.VITE_HACK_API,
            upcoming: true,
            limit: 10,
            order_by: "start",
          },
        });
        setContests(response.data.objects);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-tr from-sky-50 to-white min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-5">
      Must-Attend Hackathons
      </h1>
      <p className="text-xl text-center text-slate-800 mb-10">Gear up for innovation! Discover top hackathons where creativity meets code & perfect opportunities to build, learn, and connect with tech enthusiasts around the globe.</p>

      {contests.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Loading contests...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contests.map((contest, i) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <a
                    href={contest.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    {contest.event}
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                    <Globe size={16} /> {contest.resource.name}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-blue-500" />
                  <span>
                    Starts:{" "}
                    <span className="font-medium text-gray-900">
                      {new Date(contest.start).toLocaleString()}
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock8 size={16} className="text-green-500" />
                  <span>
                    Duration:{" "}
                    <span className="font-medium text-gray-900">
                      {Math.floor(contest.duration / 3600)} hrs{" "}
                      {Math.floor((contest.duration % 3600) / 60)} mins
                    </span>
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default HackathonList;
