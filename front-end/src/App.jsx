import React from 'react';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import PostFilterBar from './components/PostFilterBar';
import Home from './assets/pages/Home';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Slider />
      <Home />
    </>
  );
}

export default App;
