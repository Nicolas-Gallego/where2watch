import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";
import '../src/css/App.css';
import NavbarUnregistered from './components/NavbarUnregistered'
import NavbarRegistered from './components/NavbarRegistered'
import FilmPage from './views/FilmPage'
import Catalog from './views/Catalog';

function App() {
  return (
    <div>

     <NavbarUnregistered/>
     {/* <NavbarRegistered/> */}
    
    <BrowserRouter>
      <Route path="/home" exact component={Home}></Route>
      <Route path="/home/:cat" component={Home}></Route>
      <Route path="/login"  component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/profile/:id"  component={Profile}></Route>
      <Route path="/editprofile"  component={EditProfile}></Route>     
      <Route path="/films/:id"  component={FilmPage}></Route>     
      <Route path="/catalog"  component={Catalog}></Route>     


{/*     
/categories 
/user-profile/:user_id/
/user-profile/:user_id/modify
/:user_id/movies
/:user_id/movies/categories=?
/:user_id/movies/categories=?/:movie_id */}
    </BrowserRouter>
    </div>
  );
}

export default App;
