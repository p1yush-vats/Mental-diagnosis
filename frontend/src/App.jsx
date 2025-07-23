// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar';
import Home from './Pages/Home';
import MentalHealthStepper from './Pages/MentalHealthStepper'; // Or wherever your Survey component is
import Visualizations from './Pages/Visualizations'; // Same for Visualizations

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<MentalHealthStepper />} />
        <Route path="/visuals" element={<Visualizations />} />
      </Routes>
    </Router>
  );
};

export default App;
