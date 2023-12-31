import React from 'react';
import ConverterForm from './components/ConverterForm';
import Header from './components/header';
import TopList from './components/TopList'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<TopList />} />
          <Route path="convert" element={<ConverterForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
