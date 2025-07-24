// src/pages/BookList.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce'; // install using: npm i lodash.debounce

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({ genre: '', author: '' });

  const fetchBooks = async () => {
    const query = new URLSearchParams(filter).toString();
    const res = await API.get(`/books?${query}`);
    setBooks(res.data);
  };

  const debouncedFetch = debounce(fetchBooks, 500);

  useEffect(() => {
    debouncedFetch();
    return debouncedFetch.cancel;
  }, [filter]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">📚 Book Library</h2>

      <div className="flex space-x-4 mb-6">
        <input
          placeholder="Filter by genre"
          className="border p-2 flex-1 rounded"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, genre: e.target.value }))
          }
        />
        <input
          placeholder="Filter by author"
          className="border p-2 flex-1 rounded"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, author: e.target.value }))
          }
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link
            key={book._id}
            to={`/book/${book._id}`}
            className="bg-white border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-500">Genre: {book.genre}</p>
            <p className="mt-2 text-yellow-600">
              ⭐ {book.avgRating?.toFixed(1) || 0}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
