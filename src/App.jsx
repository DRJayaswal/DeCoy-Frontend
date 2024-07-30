import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Archives from './components/Archives';
import Nav from './components/Nav';
import Foot from './components/Foot';
import Jukebox from './components/Jukebox';
import Records from './components/Records';
import Locale from './components/Locale';
import Error from './components/Error';
import { getSpotifyToken } from './spotifyToken';
import axios from 'axios';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jukebox" element={<Jukebox />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/records" element={<Records/>} />
        <Route path="/locale" element={<Locale />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Foot />
    </Router>
  );
};

export default App;