import useSWR from "swr";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import axios from "axios";
import { useSearchParams } from "react-router";
import VideoDetail from "./components/VideoDetail";
import { Routes, Route } from "react-router";
import { useState } from "react";
import Playlist from "./pages/Playlist";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function App() {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (video) => {
    setPlaylist((prev) => [...prev, video]);
  };

  const removeFromPlaylist = (index) => {
    setPlaylist((prev) => prev.filter((_, i) => i !== index));
  };

  const [searchParams /* setSearchParams*/] = useSearchParams();
  const query = searchParams.get("q");

  const { data, error } = useSWR(
    query ? `https://harbour.dev.is/api/search?q=${query}` : null,
    fetcher
  );

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main videos={data} error={error} />} />
       
        <Route
          path="/video/:videoId"
          element={<VideoDetail addToPlaylist={addToPlaylist} />}
        />
        <Route
          path="/playlist"
          element={
            <Playlist
              playlist={playlist}
              removeFromPlaylist={removeFromPlaylist}
            />
          }
        />
      </Routes>
    </>
  );
}
