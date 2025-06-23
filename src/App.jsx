import React, { useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";

const App = () => {
  const [movie, setMovie] = useState(null); // Changed to single movie
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (query) => {
    if (!query || query.trim().length < 3) {
      setError("Please enter at least 3 characters");
      setMovie(null);
      return;
    }
    
    setLoading(true);
    setError("");
    setMovie(null);
    
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          apikey: "4f719c29",
          t: query
        }
      });

      if (response.data.Response === "True") {
        setMovie(response.data); // Set the single movie object
      } else {
        setError(response.data.Error || "Movie not found");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">🎬 Movie Search App</h1>
      <SearchBar onSearch={searchMovies} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {movie && (
        <div className="max-w-md mx-auto mt-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
            alt={movie.Title} 
            className="w-full h-96 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold">{movie.Title} ({movie.Year})</h2>
            <p className="text-gray-300">{movie.Genre}</p>
            <p className="mt-2">{movie.Plot}</p>
            <div className="mt-4">
              <p><span className="font-semibold">Director:</span> {movie.Director}</p>
              <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
              <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
              <p><span className="font-semibold">IMDB Rating:</span> {movie.imdbRating}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;