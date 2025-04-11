// File: Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Chat = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const chatRef = ref(db, 'globalChat');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allMessages = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(allMessages);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    const newMessage = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      content: message.trim(),
      timestamp: Date.now(),
    };

    await push(ref(db, 'globalChat'), newMessage);
    setMessage('');
  };

  if (!user) {
    return <div className="text-center p-6 text-blue-600 font-semibold animate-pulse">Loading AlumPedia Chat...</div>;
  }

  return (
    <>
    
    <div className="w-full min-h-screen  flex items-center justify-center bg-white px-4">
      <div className="w-full  h-[90vh] rounded-2xl backdrop-blur-md bg-white/60 border border-blue-200 shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-blue-200 border-b p-5 border-blue-100 shadow-sm flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl ml-2 font-bold text-blue-800 ">
          AlumPedia
        </h1>
        <Link to="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Back to Home
          </button>
        </Link>
      </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white/40">
          {messages.map((msg, idx) => {
            const isUser = msg.uid === user.uid;
            return (
              <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md px-4 py-3 rounded-2xl shadow ${isUser ? 'bg-blue-600/90 text-white' : 'bg-white border border-blue-200 text-blue-800'}`}>
                  <p className={`text-xs font-semibold mb-1 ${isUser ? 'text-blue-200' : 'text-blue-600'}`}>{msg.name}</p>
                  {isMediaLink(msg.content)
                    ? renderMedia(msg.content, isUser)
                    : <p className="text-sm leading-relaxed">{msg.content}</p>}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </main>

        {/* Input */}
        <footer className="py-3 px-6 bg-white/70 border-t border-blue-100 flex gap-3 items-center">
          <input
            type="text"
            placeholder="Type message or media link..."
            className="flex-grow px-4 py-2 rounded-xl bg-white border border-blue-200 shadow-inner text-blue-700 placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-300"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
    </>
  );
};

const isMediaLink = (text) => {
  const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
  const videoExtensions = /\.(mp4|webm|ogg)$/i;
  const docExtensions = /\.(pdf|docx|pptx|txt|zip|rar)$/i;
  return imageExtensions.test(text) || videoExtensions.test(text) || docExtensions.test(text);
};

const renderMedia = (url, isUser) => {
  const baseClass = 'mt-2 rounded-xl max-w-full shadow';
  const linkClass = isUser ? 'text-blue-100 underline' : 'text-blue-700 underline';

  if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return <img src={url} alt="media" className={baseClass} />;
  }
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return <video controls src={url} className={baseClass} />;
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-block`}>
      📎 Open File
    </a>
  );
};

export default Chat;
