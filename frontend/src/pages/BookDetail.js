import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState({ review_text: '', rating: 5 });

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error('Failed to fetch book:', err);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/reviews/${id}`, review);
      setReview({ review_text: '', rating: 5 }); // Reset form
      fetchBook(); // Refresh book with new review
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Error submitting review');
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Average Rating: {book.avgRating?.toFixed(1) || 0} ⭐</p>

      <h3>Reviews</h3>
      <ul>
        {book.reviews?.length > 0 ? (
          book.reviews.map((rev, i) => (
            <li key={i}>
              <strong>{rev.reviewer?.username || 'Anonymous'}:</strong> {rev.review_text} ({rev.rating}⭐)
            </li>
          ))
        ) : (
          <li>No reviews yet.</li>
        )}
      </ul>

      <h3>Add Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="review_text"
          value={review.review_text}
          onChange={handleChange}
          placeholder="Write a review..."
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={review.rating}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
