import React, { useState } from "react";

import "./App.css";
import "./loading.css";
import "./test.css";
import { MdDonutLarge, MdOutlineContentPasteGo } from "react-icons/md";
import { LuHardDriveUpload } from "react-icons/lu";
// import { BoxesLoader } from "react-awesome-loaders";
function HomePage() {
  const [essay, setEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  // const [percentage, setPercentage] = useState(null);
  const [decision, setDecision] = useState("");
  const [loading, setLoading] = useState(false);
  const [essayChanged, setEssayChanged] = useState(false);
  const [promptChanged, setPromptChanged] = useState(false);
  const [result, setResult] = useState(null);

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
      // // setLoading(true);
      // // setPercentage(data.percentage);
      // setDecision(data.decision);
      const data = { decision: "Human-written" };
      // // setPercentage(data.percentage);
      setDecision(data.decision);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEssayChange = (event) => {
    const newText = event.target.value;
    setEssay(newText);

    setEssayChanged(newText.trim().length > 0);
  };
  const handlePromptChange = (event) => {
    const newText = event.target.value;
    setPrompt(newText);
    setPromptChanged(newText.trim().length > 0);
  };

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setEssay(clipboardText);
    setEssayChanged(true);
  };

  const handlePastePrompt = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setPrompt(clipboardText);
    setPromptChanged(true);
  };

  const handleUpload = (event) => {
    const files = event.target.files;
    console.log(files); // Check if files is defined
    if (!files || files.length === 0) {
      console.log("No files selected");
      return; // If no files selected, do nothing
    }
    const file = files[0];
    console.log(file); // Check if file is defined
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log(text); // Check the content of the text read from the file
      setEssay(text);
      setEssayChanged(true);
    };
    reader.readAsText(file);
  };

  const scrollToTargetDiv = () => {
    const targetDiv = document.getElementById("res");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="content">
      {!loading && (
        <div className="essay">
          <h2>Essay</h2>
          <textarea
            className="essayText"
            value={essay}
            onChange={handleEssayChange}
            placeholder="Paste your essay here..."
            rows={15}
          />
          <br />
          {!essayChanged && (
            <div className="essaybuttons">
              <button className="pasteButton" onClick={handlePaste}>
                <MdOutlineContentPasteGo size="40px" />
              </button>

              <label className="fileLabel">
                <LuHardDriveUpload size={"40px"} />{" "}
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          )}
        </div>
      )}
      {!loading && (
        <div className="prompt">
          <form onSubmit={handleSubmit}>
            <h2>Prompt (optional)</h2>
            <textarea
              className="promptText"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Enter the prompt here..."
              rows={5}
              cols={50}
            />
            {!promptChanged && (
              <button className="pasteButtonPrompt" onClick={handlePastePrompt}>
                <MdOutlineContentPasteGo size="20px" />
              </button>
            )}
            <div>
              <button
                className="detectButton"
                type="submit"
                onClick={() => {
                  setLoading(false);
                  scrollToTargetDiv();
                }}
              >
                Detect
              </button>
            </div>
          </form>
        </div>
      )}

      {!loading && decision !== null && (
        <div className="result" id="res">
          <div className="loading">
            <div class="box">
              <div class="plane"></div>
            </div>
            <h2t>Please wait...this may take a while!</h2t>
          </div>
          <div></div>
          {/* <h2>Result:</h2> */}
          {/* <p>Percentage: {percentage}%</p> */}

          {/* <p>{decision}</p> */}
        </div>
      )}
      {/* <div className="loading-container">
            <div className="loading-spinner"></div>
            </div> */}
    </div>
  );
}

export default HomePage;
