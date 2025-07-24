// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex space-x-4">
        <Link className="hover:underline font-semibold" to="/">Home</Link>
        <Link className="hover:underline font-semibold" to="/add-book">Add Book</Link>
      </div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Login</Link>
            <Link to="/signup" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
