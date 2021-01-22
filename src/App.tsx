import React, { useEffect } from 'react';
// import logo from './logo.svg';

import './App.css';

import View from './components/View';

function App() {
  useEffect(() => {
    document.title = "Data Loader"
  }, []);
  
  return (
    <View />
  );
}

export default App;