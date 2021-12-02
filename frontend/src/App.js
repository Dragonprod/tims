import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from './pages/system/ErrorPage';
import LandingPage from './pages/landing/LandingPage';
import ShowCasePage from './pages/showcase/ShowCasePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/showcases" element={<ShowCasePage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
