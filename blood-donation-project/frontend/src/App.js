import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BloodAvailable from './components/BloodAvailable';
import DonateBlood from './components/DonateBlood';
import GiveBlood from './components/GiveBlood'; // Import GiveBlood component
import './App.css'; // Optional: Create a CSS file for global styles
import AddBlood from './components/AddBlood'; // Import the AddBlood component

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<BloodAvailable />} />
          <Route path="/donate" element={<DonateBlood />} />
          <Route path="/give" element={<GiveBlood />} /> {/* Add route for GiveBlood */}
          <Route path="/add" element={<AddBlood />} /> {/* Add route for AddBlood */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
