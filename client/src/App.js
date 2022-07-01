import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <div >
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
