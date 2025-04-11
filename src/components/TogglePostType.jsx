import React, { useState } from 'react';
import YouTubeCategoryVideos from './YoutubeCatogaryVideos';
import TrendingRepos from './TrendingRepos';
import HackathonList from './HackathonList';
import CodeGenerator from './CodeGenerator';
const TogglePostType = () => {
  const [activeTab, setActiveTab] = useState('youtube');

  const renderComponent = () => {
    switch (activeTab) {
      case 'youtube':
        return <YouTubeCategoryVideos />;
      case 'github':
        return <TrendingRepos />;
      case 'hackathon':
        return <HackathonList />;
      case 'code' :
        return <CodeGenerator/>;
      default:
        return null;
    }
  };

  const tabs = [
    { label: 'YouTube', value: 'youtube' },
    { label: 'GitHub', value: 'github' },
    { label: 'Hackathons', value: 'hackathon' },
    {label : 'MentorMind AI' , value:'code'},
  ];

  return (
    <div className="w-full mt-22 mx-auto px-4">
      <div className="flex justify-center pt-6 flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 
              ${
                activeTab === tab.value
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-inner'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[400px]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default TogglePostType;
