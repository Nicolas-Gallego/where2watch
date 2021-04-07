import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login"  component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/profile"  component={Profile}></Route>
      <Route path="/editprofile"  component={EditProfile}></Route>
     


{/*     
/categories 
/user-profile/:user_id/
/user-profile/:user_id/modify
/:user_id/movies
/:user_id/movies/categories=?
/:user_id/movies/categories=?/:movie_id */}
    </BrowserRouter>
  );
}

export default App;
