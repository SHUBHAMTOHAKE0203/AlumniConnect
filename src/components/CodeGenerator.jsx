import React, { useState } from 'react';
import Navbar from './Navbar';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    setOutput('');

    try {
        const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();
      const generated = data?.choices?.[0]?.message?.content;
      setOutput(generated || 'No code generated.');
    } catch (err) {
      setOutput('Error generating code.');
    }

    setLoading(false);
  };

  
    return (
        <>
        <Navbar/>
        <div className="min-h-screen  flex  bg-gradient-to-br from-white via-blue-100 to-blue-200 p-6">
          <div className="w-full  bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 transition-all duration-300 hover:shadow-blue-300">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-6 flex items-center gap-3">
             
              <span>MentorMind AI</span>
            </h1>
      
            <textarea
              className="w-full p-4 rounded-xl border border-blue-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner text-gray-800 placeholder:text-blue-400 transition-all"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Write a Python function to check prime number"
            />
      
            <div className="flex justify-end mt-4">
              <button
                onClick={generateCode}
                disabled={loading}
                className={`px-6 py-3 rounded-full font-semibold text-white transition duration-300 ${
                  loading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-700 hover:bg-blue-800 hover:shadow-lg'
                }`}
              >
                {loading ? 'Generating...' : 'Generate Code'}
              </button>
            </div>
      
            {output && (
              <div className="mt-6 relative">
                <div className="text-blue-600 font-semibold mb-2">Output</div>
                <pre className="bg-gray-900 text-green-300 p-6 rounded-xl overflow-x-auto whitespace-pre-wrap shadow-lg">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
        </>
      );
      
  
};

export default CodeGenerator;
