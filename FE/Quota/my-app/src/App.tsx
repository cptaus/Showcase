import React from 'react';
import FormComponent from './comp/form';
import QuotesList from './comp/quotesList';
import './App.css';

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <body>
        <FormComponent/>
        <QuotesList/>
        </body>
      </header>
    </div>
    </>
  );
}

export default App;
