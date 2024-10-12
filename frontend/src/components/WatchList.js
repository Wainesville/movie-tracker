// src/components/WatchList.js
import React, { useEffect, useState } from 'react';
import { fetchWatchlist } from '../api';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const data = await fetchWatchlist();
      setWatchlist(data);
    };

    loadWatchlist();
  }, []);

  return (
    <div>
      <h2>Your Watchlist</h2>
      <div className="watchlist">
        {watchlist.map((movie) => (
          <div key={movie.movie_id} className="movie-card">
            <h3>{movie.title}</h3>
            {/* Optionally display other movie details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
