import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from './pages/system/ErrorPage';
import LandingPage from './pages/landing/LandingPage';
import ShowCasePage from './pages/showcase/ShowCasePage';
import AuthPage from './pages/auth/AuthPage';
import StatusProjectTag from './components/StatusProjectTag/StatusProjectTag';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/showcases" element={<ShowCasePage/>} />
        <Route exact path="/auth" element={<AuthPage/>} />
        <Route exact path="/debug" element={<StatusProjectTag status={6} type="closed"/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
