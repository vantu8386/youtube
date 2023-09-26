import { Route, Routes } from "react-router-dom";
import ShowVideoPage from "./pages/ShowVideoPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LogInPage from "./pages/LogInPage";
import SearchPage from "./pages/SearchPage";
import ChannelPage from "./pages/ChannelPage";
import UploadPage from "./pages/UploadPage";
import UserChangePage from "./pages/UserChangePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/show-video/:id" element={<ShowVideoPage />} />
        <Route path="/:username" element={<UserChangePage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/channel" element={<ChannelPage />} />
        <Route path="/upload" element={<UploadPage/>} />
      </Routes>
    </>
  );
}

export default App;
