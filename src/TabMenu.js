import React from "react";

function TabMenu({ activeTab, setActiveTab }) {
  return (
    <div className="tab-menu">
      <button
        className={activeTab === "essay" ? "active" : ""}
        onClick={() => setActiveTab("essay")}
      >
        Essay
      </button>
      <button
        className={activeTab === "prompt" ? "active" : ""}
        onClick={() => setActiveTab("prompt")}
      >
        Prompt
      </button>
    </div>
  );
}

export default TabMenu;
