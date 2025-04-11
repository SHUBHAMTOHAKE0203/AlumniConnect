import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchUserData } from '../firebaseHelpers';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const auth = getAuth();

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      }
    };
    if (!loading) {
      loadUserData();
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">No user data found</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-12 px-4 md:px-8">
      <motion.div
        className="w-full p-8 rounded-3xl shadow-2xl border border-white/60 bg-white/30 backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 px-4">
          <div className="flex items-center gap-6">
            <img
              src={
                userData?.photoURL ||
                `https://api.dicebear.com/6.x/initials/svg?seed=${userData.name || 'User'}`
              }
              alt="avatar"
              className="w-20 h-20 rounded-full border-2 border-white shadow-md object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-1">
                Welcome, {userData.name}
              </h2>
              <p className="text-sm text-gray-500">
                {userData.role === 'alumni' ? 'Alumni Member' : 'Student Member'}
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 bg-white/50 text-gray-700 px-5 py-2 rounded-full text-sm font-medium shadow-inner backdrop-blur-md border border-gray-200">
            🎓 {userData.course} — Class of {userData.graduationYear}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 text-gray-800">
          <InfoCard label="Email" value={userData.email} />
          <InfoCard label="Phone" value={userData.phone} />
          <InfoCard label="Country" value={userData.country} />
          <InfoCard label="City" value={userData.city} />
          <InfoCard label="Course" value={userData.course} />
          <InfoCard label="Role" value={userData.role} />
        </div>

        {/* Extra Section */}
        <div className="mt-12 mx-4 p-6 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">🚀 Upcoming Features</h3>
          <p className="text-sm text-gray-600">
            New tools and features are in the works — job boards, alumni networking, and more till then <Link to="/">Go To Home</Link>!
          </p>
        </div>
      </motion.div>
    </div>
    </>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="p-5 rounded-xl border border-white/60 bg-white/40 backdrop-blur-md shadow hover:shadow-md transition duration-300">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-base font-semibold text-gray-800">{value || '—'}</p>
  </div>
);

export default Dashboard;
