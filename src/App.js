import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Read from './Read';
function App() {
  return (
    <>
      <Routes>
        <Route exact path='/read/:id' element={<Read />} />
      </Routes>
    </>
  );
}

export default App;
