import logo from './logo.svg';
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.scss';
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import MySetlists from "./pages/mySetlists/MySetlists";
import NewSetlist from "./pages/newSetlist/NewSetlist";
import Homepage from "./pages/home/Homepage";

function App() {

  return (
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-setlists" element={<MySetlists />} />
            <Route path="/new-setlist" element={<NewSetlist />} />
          </Routes>
  );
}

export default App;
