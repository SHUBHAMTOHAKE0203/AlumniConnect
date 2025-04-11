import React, { useState, useEffect } from 'react';
import { registerUser, fetchUserData } from '../firebaseHelpers';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    graduationYear: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [locationData, setLocationData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const data = await res.json();
        setLocationData({
          city: data.city,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      } catch (err) {
        console.error('Location fetch failed:', err);
      }
    };
    fetchLocation();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }

    const userData = {
      ...formData,
      ...locationData,
      createdAt: Date.now(),
    };

    try {
      const userCredential = await registerUser(
        formData.email,
        formData.password,
        userData
      );
      const fetchedData = await fetchUserData(userCredential.user.uid);
      alert('Registered Successfully');
      navigate('/dashboard', {
        state: { email: formData.email, userData: fetchedData },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Quote/Visual */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-[150%] h-32 overflow-hidden"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              fillOpacity="0.2"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join AlumniConnect
        </motion.h1>
        <motion.p
          className="text-xl mt-4 text-center px-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Build connections that last a lifetime.
        </motion.p>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex justify-center items-center bg-white p-8">
        <motion.div
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", type: "text", placeholder: "Name" },
              { name: "email", type: "email", placeholder: "Email" },
              { name: "phone", type: "text", placeholder: "Phone" },
              { name: "course", type: "text", placeholder: "Course" },
              { name: "graduationYear", type: "text", placeholder: "Graduation Year" },
            ].map((field, i) => (
              <motion.input
                key={i}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}

            <motion.select
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </motion.select>

            <motion.input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />

           

            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
