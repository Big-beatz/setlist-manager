import React, {useContext, useEffect, useState} from 'react'
import {Routes, Route, Navigate, useNavigate, Redirect, Router} from 'react-router-dom'
import './App.scss';
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import MySetlists from "./pages/mySetlists/MySetlists";
import NewSetlist from "./pages/newSetlist/NewSetlist";
import Homepage from "./pages/home/Homepage";
import Register from "./pages/Register/Register";
import CreateSetlist from "./components/CreateSetlist/CreateSetlist";
import {AuthContext} from "./context/AuthContext";

function App() {
    const navigate = useNavigate()
    const {authState} = useContext(AuthContext)

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Homepage/>} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/my-setlists" element={<MySetlists/>}/>
                <Route path="/new-setlist" element={<NewSetlist/>}/>
                <Route path="/create-setlist" element={<CreateSetlist/>}/>
            </Routes>
        </>
    );
}

export default App;
