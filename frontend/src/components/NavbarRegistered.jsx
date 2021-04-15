import "../css/navbar.css";

const NavbarUnregistered = () => {
  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex justify-content-start align-items-center"
          href="/home"
        >
          <img src="/w2w_logo.png" alt="logo" className="logo shadowfilter" />
          <div>
            <h1 className="mainTitle d-flex flex-wrap">
              <span>Where</span>
              <span>2</span>
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
              Catalog
            </a>
            <a className="nav-link" href="/home">
              Logout
            </a>
            <a className="nav-link" href="/profile">
              {/* must be replace by pp from user */}
              <img
                src="pp.png"
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
