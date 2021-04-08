import "../css/navbar.css";

const NavbarUnregistered = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/w2w_logo.png" alt="logo" className="logo" />
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link" href="/catalog">
              Catalog
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