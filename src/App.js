import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import APIPage from './APIPage';
import PaperPage from './PaperPage';
import Hamburger from 'hamburger-react';
import { PiDetectiveBold, PiSelectionBackgroundLight } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import logo from './logo2.png';
import logo2 from './footer.png';
function App() {
  return (
    <Router>
      <div className="container">
        <div className="tab">
          <div className="header">
          <NavLink className="tablinks" activeClassName="active" to="/" style={{fontWeight: "1000"}}><img src={logo} alt="logo"style={{width:"200px", marginTop: "10px", marginBottom: "10px"}}/></NavLink>
          </div>
          <NavLink className="tablinks" activeClassName="active" exact to="/" style={{fontWeight: "1000"}}>Home</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/about"style={{fontWeight: "1000"}}>About</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/contact"style={{fontWeight: "1000"}}>Contact</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/api"style={{fontWeight: "1000"}}>API</NavLink>
          <NavLink className="tablinks" activeClassName="active" to="/paper"style={{fontWeight: "1000"}}>Paper</NavLink>
          <select className='tablinks'>
            <option>EN</option>
            <option>AR</option>
          </select>
          <NavLink className="tablinks" activeClassName="active" to="/login">
          <FaCircleUser className="tablinks" color="#007bff" size="35px">Home</FaCircleUser>
          </NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/api" element={<APIPage />} />
            <Route path="/paper" element={<PaperPage />} />
          </Routes>
        </div>
        <footer className='footer'> 
        <div className="footer">

            {/* <PiDetectiveBold className="icon" /> */}
            <img src={logo2} alt="logo2"style={{width:"100px"}}/>
          </div>
          <h4t>privacy policy  | terms of service | contact us</h4t>
        </footer>
      </div>
    </Router>
  );
}

export default App;
