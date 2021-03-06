import "../css/navbar.css";

const NavbarUnregistered = () => {
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
          className="collapse navbar-collapse justify-content-end "
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav align-items-center">
            <a className="nav-link " aria-current="page" href="/home">
              Home
            </a>
            <a className="nav-link" href="/catalog">
              Search
            </a>
            <a className="nav-link" href="/login">
              Login
            </a>
            <a className="nav-link" href="/signup">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUnregistered;
