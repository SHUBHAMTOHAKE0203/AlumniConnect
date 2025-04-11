import React, { useState, useEffect } from 'react';
import { fetchAllAlumni } from '../firebaseHelpers';
import Navbar from './Navbar';

const AlumniSection = () => {
  const [alumni, setAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

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

  const handleBack = () => setSelectedAlumni(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 py-10 font-sans text-black">
        <div className="max-w-7xl mx-auto">
          {!selectedAlumni ? (
            <>
              <h2 className="text-5xl font-bold text-center mb-16 text-black tracking-wide">
                 Our Stellar Alumni
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
                {alumni.map((a) => (
                  <div
                    key={a.uid}
                    onClick={() => setSelectedAlumni(a)}
                    className="bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-6 cursor-pointer text-center hover:scale-105"
                  >
                    <img
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${a.name}`}
                      alt={a.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md"
                    />
                    <h4 className="text-xl font-semibold text-blue-900">{a.name}</h4>
                    <p className="text-sm text-gray-600">{a.course}</p>
                    <p className="text-sm text-gray-500">({a.graduationYear})</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[70vh]">
              <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedAlumni.name}`}
                  alt={selectedAlumni.name}
                  className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-blue-600 shadow-md"
                />
                <h2 className="text-3xl font-bold text-blue-800 mb-2">{selectedAlumni.name}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {selectedAlumni.course} ({selectedAlumni.graduationYear})
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm text-gray-700">
                  <p><strong>Email:</strong> {selectedAlumni.email}</p>
                  <p><strong>Phone:</strong> {selectedAlumni.phone}</p>
                  <p><strong>City:</strong> {selectedAlumni.city}</p>
                  <p><strong>Country:</strong> {selectedAlumni.country}</p>
                  <p><strong>Role:</strong> {selectedAlumni.role}</p>
                </div>

                <div className="mt-10">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md"
                  >
                    ← Back to Alumni Grid
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlumniSection;
