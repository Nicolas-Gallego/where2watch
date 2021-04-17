import "../css/navbar.css";
import { useEffect, useState } from "react";

const NavbarUnregistered = () => {
  const [myToken, setMyToken] = useState(localStorage.getItem("token"));
  const [myInfos, setMyInfos] = useState("");

  useEffect(() => {
    checkToken();
  }, [myToken]);

  const checkToken = () => {
    fetch(`http://localhost:8000/user/nav`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        setMyInfos(response.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex justify-content-start align-items-center"
          href="/home"
        >
          <img
            src="/w2w_logo_white.png"
            alt="logo"
            className="logo shadowfilter"
          />
          <div className="titleNav">
            <h1 className="mainTitle d-flex flex-wrap shadowfilter">
              <span>Where</span>&thinsp;
              <span>2</span>&thinsp;
              <span>Watch</span>
            </h1>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav  align-items-center">
            <a className="nav-link" aria-current="page" href="/home">
              Home
            </a>
            <a className="nav-link" href="/catalog">
              Search
            </a>
            <a
              className="nav-link"
              href="/home"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </a>
            <a
              className="nav-link"
              href={`/profile/${myInfos._id}`}
              onClick={() => checkToken()}
            >
              {/* must be replace by pp from user */}
              <img
                src={
                  myInfos.profilePicture
                    ? `http://localhost:8000/${myInfos.profilePicture}`
                    : "pp.png"
                }
                alt="profile picture"
                className="profilePicture"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUnregistered;
