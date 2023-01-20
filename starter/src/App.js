import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/search" component={SearchPage} />
      </Routes>
    </div>
  );
}

export default App;
