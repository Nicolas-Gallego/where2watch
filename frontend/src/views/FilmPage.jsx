import NavbarUnregistered from "../components/NavbarUnregistered";
import "../filmPage.css";
const FilmPage = () => {
  return (
    <>
      <NavbarUnregistered />
      <div>
        <div className="container-fluid">
          {/* must be replace by film title */}
          <h2 className="title">Film Title</h2>
          <div className="row d-flex justify-content-center">
            {/* must be replace by film poster  */}
            <img
              src="placeholder_poster.png"
              alt="film poster"
              className="filmPoster col-md-6 col-sm-12"
            />
            <div className="col-md-6 col-sm-12 mt-1">
              <h4>Synopsis</h4>
              {/* must be replace by fil Synopcis */}
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
                <h5>Availble on </h5>
              <div className="logos d-flex justify-content-start">
                <a href="#">
                  {" "}
                  <img src="netflix.png" alt="" className="logoPlatform" />
                </a>
                <a href="#">
                  {" "}
                  <img src="prime.png" alt="" className="logoPlatform" />
                </a>
                <a href="#">
                  {" "}
                  <img src="disney.png" alt="" className="logoPlatform" />
                </a>
              </div>
              <div className="filmInfos">
                <h5>Casting</h5>
                <span>
                  Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem
                  ipsum
                </span>
                <h5>Director</h5>
                <span>Christopher Nolan</span>
              </div>
              <div>
                <span>
                  <h6>Genre</h6>Drama, Thriller
                </span>
              </div>
              <div>
                <span>
                  <h6>Note</h6>****
                </span>
              </div>
              <div>
                <span>
                  <h6>Duration</h6>2h55
                </span>
              </div>
              <div className="other">
                <h4>Similar movies</h4>

                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      class="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        src="placeholder_poster.png"
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="placeholder_poster.png"
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="placeholder_poster.png"
                        class="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container2"></div>
        </div>
      </div>
    </>
  );
};

export default FilmPage;
