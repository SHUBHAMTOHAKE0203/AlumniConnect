import React, { useState } from "react";
import { MessageCircle, FolderOpen } from "lucide-react";
import Chat from "./Chat";
import Feed from "./Feed";
import Navbar from "./Navbar";
const ToggleSections = () => {
  const [activeSection, setActiveSection] = useState("chat");

  const tabStyle = (isActive) =>
    `flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 
     border-b-2 ${
       isActive
         ? "border-blue-600 text-blue-600"
         : "border-transparent text-gray-600 hover:text-blue-600"
     }`;

  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen bg-[#f5faff] mt-22 pt-4 px-4 sm:px-8">
      {/* Tab Navbar */}
      <div className="bg-white rounded-xl shadow-sm w-full mb-2">
        <div className="flex border-b w-full">
          <button
            onClick={() => setActiveSection("chat")}
            className={tabStyle(activeSection === "chat")}
          >
            <MessageCircle size={16} />
            <span>Live Chat</span>
          </button>
          <button
            onClick={() => setActiveSection("resources")}
            className={tabStyle(activeSection === "resources")}
          >
            <FolderOpen size={16} />
            <span>Share Resources</span>
          </button>
        </div>
      </div>

      {/* Section Content */}
      <div className="w-full bg-white rounded-2xl shadow-inner p-6 transition-all duration-300 min-h-[450px]">
        {activeSection === "chat" ? (
          <div className="text-left text-gray-700 h-full">
            {/* 🔁 Replace this with your <LiveChat /> */}
            <Chat/>
          </div>
        ) : (
          <div className="text-left text-gray-700 h-full">
            {/* 🔁 Replace this with your <ShareResources /> */}
            <Feed/>
          </div>
        )}
      </div>
    </div>
     </>
  );
};

export default ToggleSections;
