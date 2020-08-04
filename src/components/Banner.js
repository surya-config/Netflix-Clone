import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import request from "../api/request";
import requests from "../api/request";
import "../css/Banner.css";

import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
          )`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner-contents">
          <h1 style={{ color: "white" }} className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner-buttons">
            <button
              className="banner-button"
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button className="banner-button">My List</button>
          </div>
          <h1 style={{ color: "white" }} className="banner-description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>

      {trailerUrl ? <Youtube videoId={trailerUrl} opts={opts} /> : null}
    </div>
  );
}

export default Banner;
