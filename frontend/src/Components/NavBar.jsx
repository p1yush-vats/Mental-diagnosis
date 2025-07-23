import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png';
import ThemeSwitcher from './ThemeSwitcher';
import { Menu, X } from 'lucide-react'; // You can use any icons here

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = (path) =>
    `block text-sm font-medium py-2 ${
      location.pathname === path
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-blue-600'
    }`;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-gray-800">Mental Health Check</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={navLinkClasses('/')}>Home</Link>
          <Link to="/survey" className={navLinkClasses('/Survey')}>Survey</Link>
          <Link to="/visuals" className={navLinkClasses('/visuals')}>Visualizations</Link>
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className={navLinkClasses('/')} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/survey" className={navLinkClasses('/Survey')} onClick={() => setIsOpen(false)}>Survey</Link>
          <Link to="/visuals" className={navLinkClasses('/visuals')} onClick={() => setIsOpen(false)}>Visualizations</Link>
          <ThemeSwitcher />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
