import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guides from "./pages/guides/create";

import Home from "./pages/home";
import Library from "./pages/library";
import Playlist from "./pages/playlist";
import Song from "./pages/song";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/song/create-guide/:id" element={<Guides />} />
          <Route path="/song/:id" element={<Song />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
