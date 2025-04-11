import React, { useState } from "react";
import Navbar from "./Navbar";

const MentorshipForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsSubmitted(true);
          form.reset();
        } else {
          alert("Something went wrong. Please try again!");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-100 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-10 w-full space-y-6"
        >
          <input
            type="hidden"
            name="access_key"
            value="43bed579-8319-42ba-9562-393ac77326dd"
          />
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-blue-600">
              Mentorship Request
            </h2>
            <p className="text-gray-500">
              Fill in the details below to connect with your mentor.
            </p>
          </div>

          {/* Horizontal Fields */}
          <div className="space-y-6">
            {/* Candidate Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="md:w-1/3 text-sm font-semibold text-gray-700">
                Candidate Name
              </label>
              <input
                type="text"
                name="candidate_name"
                required
                placeholder="Enter your name"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Candidate Email */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="md:w-1/3 text-sm font-semibold text-gray-700">
                Candidate Email
              </label>
              <input
                type="email"
                name="candidate_email"
                required
                placeholder="Enter your email"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Mentor Email */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="md:w-1/3 text-sm font-semibold text-gray-700">
                Mentor Email
              </label>
              <input
                type="email"
                name="mentor_email"
                required
                placeholder="Enter mentor's email"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Reason for Mentorship */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <label className="md:w-1/3 text-sm font-semibold text-gray-700 pt-2">
                Why do you need mentorship?
              </label>
              <textarea
                name="reason"
                required
                placeholder="Describe your need for mentorship..."
                rows="3"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-md"
            >
              Submit Request
            </button>

            {isSubmitted && (
              <p className="text-green-600 text-center font-medium mt-4">
                Form submitted successfully!
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default MentorshipForm;
