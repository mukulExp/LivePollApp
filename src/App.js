import React, { useState, useEffect } from 'react';
import { Switch, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  return (
    <Routes>
                    <Route index element={<Home/>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
  </Routes>
  );
}

export default App;
