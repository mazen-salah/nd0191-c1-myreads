import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import './App.css';

function App() {
  return (
    <div>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/search" component={SearchPage} />
    </div>
  );
}

export default App;
