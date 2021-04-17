import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "animate.css/animate.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from "./views/Home";
import Login from "./views/Login";
import ProfilePage from "./views/ProfilePage";
import EditProfile from "./views/EditProfile";
import "../src/css/App.css";
import NavbarUnregistered from "./components/NavbarUnregistered";
import NavbarRegistered from "./components/NavbarRegistered";
import FilmPage from "./views/FilmPage";
import Catalog from "./views/Catalog";
import Singup from "./views/Singup";

function App() {
  const [myToken, setMyToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log(myToken);
  }, [myToken]);
  return (
    <div>
      {myToken ? <NavbarRegistered /> : <NavbarUnregistered />}

      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Singup}></Route>
        <Route path="/profile/:id" component={ProfilePage}></Route>
        <Route path="/editprofile" component={EditProfile}></Route>
        <Route exact path="/films/:id" component={FilmPage}></Route>
        <Route path="/catalog" component={Catalog}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
