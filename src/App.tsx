import React, { useState } from 'react';
import logo from './logo.svg';
import { MyContext } from './Components/myContext';

import './App.css';
import HomePage from './Components/homePage';

function App() {

  const [languages, setLanguages] = useState<any>([]);

  
  return (
    <div className="App">
      <MyContext.Provider value={{languages,setLanguages}}>
      <HomePage />
      </MyContext.Provider>
    </div>
  );
}

export default App;
