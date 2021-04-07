import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profil from "./views/Profil";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <Route path="/profil" exact component={Profil}></Route>
    </BrowserRouter>
  );
}

export default App;
