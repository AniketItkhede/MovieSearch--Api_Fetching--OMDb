import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
        alt={movie.Title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold truncate">{movie.Title}</h2>
        <p className="text-gray-400">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;