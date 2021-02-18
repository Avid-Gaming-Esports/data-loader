import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

import View from './components/View';

function App() {
  useEffect(() => {
    document.title = "Data Loader"
  }, []);

  return (
    <Router>
      <View />
    </Router>
  );
}

export default App;
