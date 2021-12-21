import logo from './logo.svg';
import './App.css';
import Lenderform from './ApplicationForm';
import Validatorform from './ValidatorForm';
import React, { Component, Fragment,useState } from 'react';
function App() {
 const [showValidateGrid, setValidateGrid] = useState(false);
  const handleSubmit = (isValid) => {
        setValidateGrid(isValid);
    }

  return (


    <div className="App">
      <header >
         {!showValidateGrid ? (
        <Lenderform onSubmitLenderForm={handleSubmit}/>
       ):(
        <Validatorform />
        )}
      </header>
    </div>
  );
}

export default App;
