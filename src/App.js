import React, { useState } from "react";
import { PiDetectiveBold } from "react-icons/pi";
import "./App.css";
import "./loading.css";
function App() {
  const [essay, setEssay] = useState('');
  const [prompt, setPrompt] = useState('');
  // const [percentage, setPercentage] = useState(null);
  const [decision, setDecision] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     
      // const response = await fetch('API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json' 
      //   },
      //   body: JSON.stringify({ essay })
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to fetch data');
      // }
      // const data = await response.json();
      // setPercentage(data.percentage);
      // setDecision(data.decision);

      const data = {decision: 'Human-written' };
      // setPercentage(data.percentage);
      setDecision(data.decision);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI-text Detection Tool</h1>
        <PiDetectiveBold className="icon" />
      </div>
      {!loading && (
        <div className="essay">
            <h2>Essay</h2>
            <textarea
              value={essay}
              onChange={(event) => setEssay(event.target.value)}
              placeholder="Paste your essay here..."
              rows={7}
              cols={50}
            />
            <br />
        </div>
      )}
      {!loading && (
        <div className="prompt">
          <form onSubmit={handleSubmit}>
            <h2>Prompt (optional)</h2>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Enter the prompt here..."
              rows={5}
              cols={50}
            />
            <div>
            <button type="submit">Detect</button>
            </div>
            </form>
        </div>
      )}
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
        {!loading && decision !== null && (
            <div className="result" style={{ backgroundColor: decision === 'Human-written' ? 'green' : decision === 'AI-generated' ? 'red' : '#14457d' }}>
            {/* <h2>Result:</h2> */}
            {/* <p>Percentage: {percentage}%</p> */}
            <p>{decision}</p>
          </div>
        )}
      </div>
      );}

export default App;

 