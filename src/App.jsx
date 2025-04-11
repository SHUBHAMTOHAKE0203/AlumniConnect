import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/dashboard';
import ViewNetwork from './components/ViewNetwork';
import Chat from './components/Chat';
import AlumniList from './components/AlumniList';
import ViewAlumni from './components/AlumniSection';
import VideoCall from './components/VideoCall';
import TrendingRepos from './components/TrendingRepos';
import YouTubeCategoryVideos from './components/YoutubeCatogaryVideos';
import HackathonList from './components/HackathonList';
import Landing from './components/Landing';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import JobSearchApp from './components/JobSearchApp';
import CodeGenerator from './components/CodeGenerator';
import TogglePostType from './components/TogglePostType';
import ToggleSections from './components/ToggleSections';
import MentorshipForm from './components/MentorshipForm';
import NewsCards from './components/NewsCards';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
    
  
   
        <Routes>
        <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/share-resources' element={<ToggleSections/>}/>
          <Route path="/feed" element={<Feed />} />
          <Route path="/contest" element={<HackathonList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/repo" element={<TrendingRepos />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-network" element={<ViewNetwork />} />
          <Route path="/resources" element={<YouTubeCategoryVideos />} />
          <Route path="/job" element={<JobSearchApp />} />
          <Route path="/vc" element={  <VideoCall/>}/>
          <Route path="/alumni" element={<AlumniList />} />
          <Route path="/mentor" element={<MentorshipForm />} />
          <Route path="/alumni-choice" element={<TogglePostType />} />
          <Route path="/view-alumni/:id" element={<ViewAlumni />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
