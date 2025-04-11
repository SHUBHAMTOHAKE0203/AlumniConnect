import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { logOutUser, fetchUserData } from '../firebaseHelpers';
import { GraduationCap,Briefcase } from 'lucide-react';
import MentorshipForm from './MentorshipForm';
import AlumniList from './AlumniList';
const auth = getAuth();

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      }
    };
    loadUserData();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logOutUser();
    navigate('/');
  };

  const getAvatarSeed = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const NavItem = ({ to, children }) => (
    <Link
      to={to}
      className="text-gray-700 hover:text-indigo-500 font-medium transition-all duration-200 px-3 py-1"
    >
      {children}
    </Link>
  );

 
  
    const handleLoginClick = () => {
      navigate("/login");
    };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/87 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-700 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-blue-800">Alumni Connect</h1>
                    <span className="text-sm font-medium text-gray-500">Zeal College of Engineering</span>
                  </div>
                </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
             
              {(userData?.role === 'student' || userData?.role === 'alumni') && (
                <NavItem to="/job">JobScout</NavItem>
              )}
              <NavItem to="/share-resources">Share resources</NavItem>
              <NavItem to="/alumni-choice">Alumni's Choice</NavItem>
             
              {(userData?.role === 'student') && (
                <NavItem to="/mentor">Mentorship</NavItem>
              )}
              {(userData?.role === 'alumni') && (
                <NavItem to="/vc">AlumniMeet</NavItem>
              )}
               
              <span className="text-xs uppercase px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 font-semibold">
                {userData?.role}
              </span>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <img
                  src={
                    userData?.photoURL ||
                    `https://api.dicebear.com/6.x/initials/svg?seed=${getAvatarSeed()}`
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-300 cursor-pointer shadow"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-44 z-50 border border-gray-100">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                    
                  </div>
                )}
              </div>
            </>
          ) : (
         <button
      onClick={handleLoginClick}
      className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
    >
      <Briefcase className="h-4 w-4" />
      Login as Student / Alumni
    </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
