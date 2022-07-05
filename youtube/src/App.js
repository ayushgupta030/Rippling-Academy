import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import TrendingVideos from './components/TrendingVideos';
import SearchPage from './components/SearchPage'
import {Outlet, Route, Routes} from "react-router-dom";
import {ThemeContext} from './components/ThemeContext'
const API_Key = 'AIzaSyAxUE0zaV_kQPkRw0DVE_HV3fcNcwxeimE';
function App() {
  return (
    <div>
      <ThemeContext.Provider value={API_Key}>
      <Header />
      < Routes >
        <Route path = "/" 
               element = { < TrendingVideos /> } />
        <Route path = "search" 
               element = { < SearchPage /> } />
        <Route path = "video"
               element = { < VideoPlayer /> } />
      </ Routes >
      <Outlet />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
