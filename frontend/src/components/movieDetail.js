import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [comment, setComment] = useState('');
  const [recommendation, setRecommendation] = useState(false); 
  const [reviews, setReviews] = useState([]); // To store fetched reviews

  // Fetch reviews for this movie when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${movieId}`);
        setReviews(response.data); // Set the reviews in state
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };

    fetchReviews(); // Call the function to fetch reviews
  }, [movieId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/reviews', {
        user_id: localStorage.getItem('user_id'), // Make sure this exists in localStorage
        movie_id: movieId, // Ensure this is the movieId from the params
        content: comment,  // This should be the comment content
        recommendation: true // Or false, based on what you want to send
      });
      setReviews([...reviews, response.data]); // Update the reviews state
      setComment(''); // Clear the comment input
    } catch (err) {
      console.error('Failed to submit comment', err);
    }
  };
  
  

  return (
    <div className="movie-detail">
      <h2>Movie Reviews</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment/review"
          required
        />
        <label>
          Recommend this movie?
          <input
            type="checkbox"
            checked={recommendation}
            onChange={(e) => setRecommendation(e.target.checked)}
          />
        </label>
        <button type="submit">Post Review</button>
      </form>

      <div className="reviews">
        <h3>Reviews:</h3>
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <p><strong>{review.username}</strong> says:</p>
            <p>{review.content}</p>
            <p>Recommendation: {review.recommendation ? 'Yes' : 'No'}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
