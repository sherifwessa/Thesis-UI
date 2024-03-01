import React, { useState } from "react";
import { PiDetectiveBold } from "react-icons/pi";
import "./App.css";
import "./loading.css";
function App() {
  const [essay, setEssay] = useState('');
  const [prompt, setPrompt] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [decision, setDecision] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call your API here and set percentage and decision based on the response
      // Example:
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

      // // For testing purposes, let's set some dummy values
      const data = { percentage: 80, decision: 'Human-written' };
      setPercentage(data.percentage);
      setDecision(data.decision);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>THESIS!!!</h1>
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
            <button type="submit">Detect</button>
            </form>
        </div>
      )}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!loading && percentage !== null && (
        <div className="result">
          <h2>Result:</h2>
          <p>Percentage: {percentage}%</p>
          <p>Decision: {decision}</p>
        </div>
      )}
    </div>
  );
}

export default App;

