import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Homepage.css'; // Import your CSS file

const Homepage = () => {
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState(new Set()); // To track liked reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews'); // Adjust if necessary to fetch specific movie reviews
        setReviews(response.data);
    
        // Fetch likes for each review
        response.data.forEach(async (review) => {
          const likesResponse = await axios.get(`http://localhost:5000/api/reviews/${review.id}/likes`);
          if (likesResponse.data.likes > 0) {
            setLikedReviews((prev) => new Set(prev).add(review.id));
          }
        });
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };
    

    fetchReviews();
  }, []);

  const handleLikeToggle = async (reviewId) => {
    const userId = localStorage.getItem('user_id'); // Ensure you have user_id in localStorage
    if (likedReviews.has(reviewId)) {
      // Unlike the review
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}/like`, {
        data: { user_id: userId },
      });
      setLikedReviews((prev) => {
        const newLiked = new Set(prev);
        newLiked.delete(reviewId); // Remove the review from liked set
        return newLiked;
      });
    } else {
      // Like the review
      await axios.post(`http://localhost:5000/api/reviews/${reviewId}/like`, {
        user_id: userId,
      });
      setLikedReviews((prev) => new Set(prev).add(reviewId)); // Add review to liked set
    }
  };

  return (
    <div className="homepage">
      <h2>Latest Reviews</h2>
      <div className="reviews">
      {reviews.length > 0 ? (
  reviews.map((review) => (
    <div key={review.id} className="review-box">
      <div className="review-header">
        <span className="username">{review.username}</span>
        <span className="timestamp">{new Date(review.created_at).toLocaleString()}</span>
      </div>
      <div className="movie-info">
        <Link to={`/movie/${review.movie_id}`}>
          <img src={review.thumbnail} alt={review.movie_title} className="movie-thumbnail" /> {/* Ensure thumbnail is correctly rendered */}
          <span className="movie-title">{review.movie_title}</span> {/* Display movie title */}
        </Link>
      </div>
      <blockquote className="review-content">"{review.content}"</blockquote>
      <div className="review-footer">
        <button onClick={() => handleLikeToggle(review.id)}>
          {likedReviews.has(review.id) ? 'Unlike' : 'Like'}
        </button>
        <span>{review.likes || 0} likes</span>
      </div>
    </div>
  ))
) : (
  <p>No reviews found.</p>
)}

      </div>
    </div>
  );
};

export default Homepage;
