import React from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Chào mừng bạn đến với CookBook 🍲</h1>
        <p>Trang web chia sẻ công thức nấu ăn bằng React + Bootstrap 5!</p>
      </div>
    </>
  );
}

export default App;
