import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllAlumni } from '../firebaseHelpers';
import Navbar from './Navbar';
const AlumniList = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const getAlumni = async () => {
      const allData = await fetchAllAlumni();
      const alumniList = Object.entries(allData)
        .filter(([_, data]) => data.role === 'alumni')
        .map(([uid, data]) => ({ uid, ...data }));
      setAlumni(alumniList);
    };
    getAlumni();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#f0f0f3] text-black p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-10">🎓 Meet Our Alumni</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6 place-items-center">
          {alumni.map((a) => (
            <div
              key={a.uid}
              onClick={() => navigate(`/view-alumni/${a.uid}`, { state: { alumniData: a } })}
              className="cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${a.name}`}
                alt={a.name}
                className="w-28 h-28 rounded-full mb-2 border-4 border-white shadow-md"
              />
              <h4 className="text-lg font-bold text-center">{a.name}</h4>
              <p className="text-sm text-gray-600 text-center">{a.course}</p>
              <p className="text-sm text-gray-500 text-center">({a.graduationYear})</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AlumniList;