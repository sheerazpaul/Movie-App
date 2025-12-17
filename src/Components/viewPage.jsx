import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../data/Api";
import { Spinner } from "@heroui/react";
import Download from "./Download";
import Suggestion from "./Suggestion";
import { FaHeart } from "react-icons/fa";

function viewPage() {
  const { id_param } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovieDetail = async () => {
    setIsLoading(true);
    try {
      const moviesData = await getMovieDetail(id_param);
      setMovie(moviesData.movie);
      console.log("Selected Movie: ", moviesData);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieDetail();
  }, [id_param]);
  if (!movie) {
    return (
      <div className="p-5 mt-12 h-[1000px] flex justify-center items-center bg-black text-gray-400">
        <Spinner label="Loading movies..." color="success" />
      </div>
    );
  }
  if (isLoading || !movie) {
    return (
      <div className="p-5 mt-[49px] h-[600px] flex justify-center items-center bg-black text-gray-400">
        <Spinner label="Loading movies..." color="success" />
      </div>
    );
  }
  return (
    <>
      <div className="p-5 mt-[49px] h-auto bg-black">
        <div className="flex">
          <div className="flex flex-col gap-3 mt-5 ml-5">
            <img
              src={movie.medium_cover_image}
              alt={movie.title}
              className="rounded-lg shadow-lg h-96 w-[250px]"
            />
            <Download torrents={movie.torrents} />
          </div>
          <div className="flex flex-col gap-2 ml-16 text-white mt-7">
            <h1 className="text-4xl font-semibold">{movie.title}</h1>

            <div className="mt-5 text-lg font-semibold">
              <h3>{movie.year}</h3>
              <h3>{movie.genres?.join(" / ")}</h3>
            </div>
            <div>
              <div className="flex gap-2">
                <p className="text-lg italic font-semibold">Available in :</p>
                <button className="bg-[#2E3030] p-1 border rounded-sm text-sm">
                  720p.WEB
                </button>
                <button className="bg-[#2E3030] p-1 border rounded-sm text-sm">
                  1080p.WEB
                </button>
              </div>
              <p className="text-sm font-bold text-[#2D312F] mt-2 ">
                WEB: same quality as BluRay
              </p>
            </div>
            <button className="bg-[#2E3030] p-1 border rounded-sm text-sm w-40 mt-4">
              Download Subtitle
            </button>
            <div className="flex gap-6 mt-6 items-center">
              <FaHeart style={{ color: "green", fontSize: "20px" }} />
              <p className="text-lg font-bold">{movie.like_count}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-semibold text-white flex gap-2">
                <img
                  className="h-6 w-12"
                  src="/images/pngwing.com.png"
                  alt=""
                />
                 {movie.rating} <span> / 10</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <Suggestion movieId={id_param} />
          </div>
        </div>

        <div className="flex gap-2 p-4">
          {movie.yt_trailer_code ? (
            <iframe
              width="421"
              height="204"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title="YouTube trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg "
            ></iframe>
          ) : (
            <p className="text-green-400 gap-2 font-bold">No trailer available</p>
          )}
          <div className="p-2">
            <img
              className="h-48 rounded-lg w-110"
              src={movie.medium_screenshot_image1}
              alt="screenshot 1"
            />
          </div>
          <div className="p-2">
            <img
              className="h-48 rounded-lg w-110"
              src={movie.medium_screenshot_image2}
              alt="screenshot 2"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default viewPage;
