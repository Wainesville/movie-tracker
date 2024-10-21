import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews'); // Updated URL
        setReviews(response.data); // Set the fetched reviews to state
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="homepage">
      <h2>Latest Reviews</h2>
      <div className="reviews">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.content}</p>
              <small>Recommendation: {review.recommendation ? 'Yes' : 'No'}</small>
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
