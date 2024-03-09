import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import APIPage from './APIPage';
import PaperPage from './PaperPage';
import Hamburger from 'hamburger-react';
import { PiDetectiveBold, PiSelectionBackgroundLight } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
function App() {
  return (
    <Router>
      <div className="container">
        <div className="tab">
          <div className="header">
            <h1>AI-text Detection Tool</h1>
            <PiDetectiveBold className="icon" />
          </div>
          <NavLink className="tablinks" activeClassName="active" exact to="/">Home</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/about">About</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/contact">Contact</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/api">API</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/paper">Paper</NavLink>
          <select className='tablinks'>
            <option>EN</option>
            <option>AR</option>
          </select>
          <FaCircleUser className="tablinks" color="#007bff" size="35px">Home</FaCircleUser>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/api" element={<APIPage />} />
            <Route path="/paper" element={<PaperPage />} />
          </Routes>
        </div>
        <footer className='footer'> 
        <div className="header">

            <PiDetectiveBold className="icon" />
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
