import React, { useState } from "react";
import "./App.css";
import "./loading.css";
import "./test.css";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { LuHardDriveUpload } from "react-icons/lu";
import ReactSpeedometer from "react-d3-speedometer"
import { PiHighlighterCircleDuotone } from "react-icons/pi";
import Highlighter  from "react-highlight-words";




import { jsPDF } from 'jspdf';
import backgroundImage from './blue3.png';

function HomePage() {
  const [essay, setEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [decision, setDecision] = useState("");
  const [AI_sentences, setAI_sentences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [essayChanged, setEssayChanged] = useState(false);
  const [promptChanged, setPromptChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState('Basic');
  const [promptFlag, setPromptFlag] = useState(false);
  const words = essay.split(" ").length-1;



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!essay.trim()) {
      setLoading(false);
      setErrorMessage("Essay cannot be empty.");
      return;
  }
  if (words > 1000) {
      setLoading(false);
      setErrorMessage("Essay cannot exceed 1000 words.");
      return;
  }
    try {
      const response = await fetch("http://127.0.0.1:8000", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        essay: essay,
        prompt: !prompt.empty ? prompt : '', 
        type: active 
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setDecision(data.decision);
    setPercentage(data.percentage);
    setAI_sentences(data.AI_sentences);
    setErrorMessage("");
    setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setErrorMessage("An error occurred. Please try again later.");
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
    if (!files || files.length === 0) {
      console.log("No files selected");
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setEssay(text);
      setEssayChanged(true);
    };
    reader.readAsText(file);
  };

  const handleClick = (name) => {
    setActive(name);
    setPromptFlag(name === 'Advanced');
  };


  function exportPDF(essay, content) {
    const doc = new jsPDF();
    const margin = 10; 
    const initialHeight = 20; 
    const lineHeight = 10;

  
    doc.setFontSize(18);
    doc.text("Detection Result", margin, initialHeight);
    doc.setFontSize(14);
    doc.text(`Decision: ${content.decision}`, margin, initialHeight + 2 * lineHeight);
    doc.text(`Confidence: ${content.percentage}%`, margin, initialHeight + 3 * lineHeight);

    const essayStartHeight = initialHeight + 5 * lineHeight;
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(essay, 190), margin, essayStartHeight);
    doc.save('detection-result.pdf');
}


  if (loading) {
    return (
      <div className="load" style={{ backgroundImage: `url(${backgroundImage})` , backgroundSize:"cover", backgroundPosition:"center", width: "100%", height:"100vh"}}>
        <div className="loading">
          <div className="box">
            <div className="plane"></div>
          </div>
          <h2t>Please wait...this may take a while!</h2t>
        </div>
      </div>
    );
  } else if (decision) {
    return (
      <div className="result">
        <div className="percentage">
        
        {/* <h2t>Your text is most likely   {decision}</h2t> */}
        <ReactSpeedometer
        width= {400}
        height={250} 
        value={percentage}
        currentValueText="Score"
        needleColor="#007bff"
        maxValue={100}
        maxSegmentLabels={5}
        customSegmentStops={[0, 20, 40, 60, 80, 100]}
        startColor="#32CD32"
        endColor="#C70039"
        textColor="#ffffff"
        // customSegmentLabels={[
        //   {
        //     text: "Strongly AI",
        //     position: "OUTSIDE",
        //     color: "#555",
        //   },
        //   {
        //     text: "AI-generated",
        //     position: "OUTSIDE",
        //     color: "#555",
        //   },
        //   {
        //     text: "Ok",
        //     position: "INSIDE",
        //     color: "#555",
        //     fontSize: "19px",
        //   },
        //   {
        //     text: "Human-generated",
        //     position: "OUTSIDE",
        //     color: "#555",
        //   },
        //   {
        //     text: "Strongly Human",
        //     position: "OUTSIDE",
        //     color: "#555",
        //   },
        // ]}
      />
        <h3t>{percentage}% {decision}</h3t>
        </div>
        <div className="highlighted">
          <div className="highlighted-header">
          <PiHighlighterCircleDuotone className="highlighterIcon"/>
          <h3>Highlighted text is suspected to be {decision}*</h3>
          </div>
          <div className="essay-highlighted">
          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={AI_sentences}
            autoEscape={true}
            textToHighlight={essay} />
        </div>
        <div className="highlighted-footer">
        <button className="returnToHome" onClick={() => window.location.reload()}>
          Return to Home
        </button>
        <button className="ExportToPDF" onClick={() => exportPDF(essay, { decision, percentage })}>
    Export to PDF
</button>

        </div>
          </div>
      </div>
    );
  } else {
    return (
      <div className="Container" style={{ backgroundImage: `url(${backgroundImage})` , backgroundSize:"cover", backgroundPosition:"center", width: "100%", height:"100vh"}}>
    
      <div className="content">
        <div className="Toggle">
          {['Basic', 'Advanced'].map(name => (
          <button className="toggleButton"
          key={name}
          onClick={() => handleClick(name)}
          style={{
            flex: 1,
            backgroundColor: active === name ? '#007bff' : 'transparent',
            color: active === name ? 'white' : 'black',
            
          }}
        >
          {name}
          
          </button>
         ))}
       </div>
        <div className="essay">
          <h2>Essay</h2>
          <textarea
            className="essayText"
            value={essay}
            onChange={handleEssayChange}
            placeholder="Paste or upload your essay..."
            rows={15}
          />
          <div className="wordCount">
                  
                <p> {words} / 1000</p>
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
          <br />
          {!essayChanged && (
            <div className="essaybuttons">
              <button className="pasteButton" onClick={handlePaste}>
                <MdOutlineContentPasteGo size="40px" />
                <h5t>Paste</h5t>
              </button>

              <label className="fileLabel">
                <LuHardDriveUpload size="40px" />
                
                <input
                  type="file"
                  accept=".txt, .docx, .pdf"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                />
                <h5t>Upload</h5t>
              </label>
            </div>
          )}
        </div>
        {promptFlag && (
        <div className="prompt">
          
            <h2>Prompt (optional)</h2>
            <textarea
              className="promptText"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Enter the prompt for advanced detection..."
              rows={5}
              cols={50}
            />
            {!promptChanged && (
              <button className="pasteButtonPrompt" onClick={handlePastePrompt}>
                <MdOutlineContentPasteGo size="20px" />
              </button>
            )}
           
        </div>
        )}
        <div>
            <form onSubmit={handleSubmit}>
              <button className="detectButton" type="submit">
                Detect
              </button>
            
          </form>
          </div>
      </div>
      </div>
    );
  }
}

export default HomePage;
