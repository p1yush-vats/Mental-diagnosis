import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png'; // ✅ default import
import ThemeSwitcher from './ThemeSwitcher'; // adjust path as needed

const Navbar = () => {
  const location = useLocation();

  const navLinkClasses = (path) =>
    `text-sm font-medium ${
      location.pathname === path
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-blue-600'
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo & Name */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-semibold text-gray-800">Mental Health Check</span>
      </div>

      {/* Links */}
      <div className="space-x-6">
        <Link to="/" className={navLinkClasses('/')}>Home</Link>
      {
        <>
          <Link to="/survey" className={navLinkClasses('/Survey')}>
            Survey
          </Link>
          <Link to="/visuals" className={navLinkClasses('/visuals')}>
            Visualizations
          </Link>
          <ThemeSwitcher />
        </>
      }
      </div>
    </nav>
  );
};

export default Navbar;
