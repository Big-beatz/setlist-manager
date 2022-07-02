import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.scss';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import MySetlists from "./pages/mySetlists/MySetlists";
import NewSetlist from "./pages/newSetlist/NewSetlist";
import Homepage from "./pages/home/Homepage";

function App() {
  return (
      <Router>
            <div className="background--blue">
                <div className="background--yellow">
                    <div className="background--red"></div>
                </div>
            </div>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-setlists" element={<MySetlists />} />
            <Route path="/new-setlist" element={<NewSetlist />} />
          </Routes>
      </Router>
  );
}

export default App;
