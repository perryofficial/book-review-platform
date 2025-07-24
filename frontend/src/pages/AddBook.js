// src/pages/AddBook.js
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const [book, setBook] = useState({ title: '', author: '', genre: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/books', book);
      navigate('/');
    } catch (err) {
      alert('Error adding book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Book</h2>
      <input name="title" placeholder="Title" className="border p-2 mb-3 w-full rounded" onChange={handleChange} />
      <input name="author" placeholder="Author" className="border p-2 mb-3 w-full rounded" onChange={handleChange} />
      <input name="genre" placeholder="Genre" className="border p-2 mb-3 w-full rounded" onChange={handleChange} />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add Book</button>
    </form>
  );
}
