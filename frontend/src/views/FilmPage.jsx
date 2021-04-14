import NavbarUnregistered from "../components/NavbarUnregistered";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/filmPage.css";
const FilmPage = ({ match }) => {
  const [filmInfos, setFilmInfos] = useState("");
  useEffect(() => {
    if (!filmInfos) {
      searchFilmInfos();
    }
  }, [filmInfos]);
  const searchFilmInfos = () => {
    fetch(`http://localhost:8000/films/moovice/${match.params.id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setFilmInfos(response.film);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (filmInfos) {
    return (
      <>
        <div>
          <div className="container-fluid">
            {/* must be replace by film title */}
            <h2 className="title">{filmInfos.titre}</h2>
            <div className="row d-flex justify-content-center">
              {/* must be replace by film poster  */}
              <img
                src={`https://image.tmdb.org/t/p/w300/${filmInfos.image}`}
                alt="film poster"
                className="filmPoster col-md-6 col-sm-12"
              />
              <div className="col-md-6 col-sm-12 mt-1">
                <h4>Synopsis</h4>
                {/* must be replace by film Synopsis */}
                <span>{filmInfos.description}</span>
                <h5>Availble on </h5>
                <div className="logos d-flex justify-content-start"></div>
                <div className="filmInfos">
                  <h5>Casting</h5>
                  <span>
                    {filmInfos.casting.slice(0, 5).map((acteur) => {
                      return <span>{acteur.nom}, </span>;
                    })}
                  </span>
                  <h5>Director</h5>
                  {filmInfos.directeurs.map((real) => {
                    return <span>{real.nom}, </span>;
                  })}
                </div>
                <div>
                  <span>
                    <h6>Genre</h6>
                    {filmInfos.genres.map((genre) => {
                      return <span>{genre}, </span>;
                    })}
                  </span>
                </div>
                <div>
                  <span>
                    <h6>Note</h6>
                    {filmInfos.note}/10
                  </span>
                </div>
                <div className="other">
                  <h4>Similar movies</h4>
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {filmInfos.similars.map((simi, index) => {
                        if (index === 0) {
                          return (
                            <Link
                              to={`/films/${simi.id_imdb}`}
                              className="carousel-item active"
                            >
                              <div>
                                <img
                                  src={`https://image.tmdb.org/t/p/w300/${simi.image}`}
                                  className="d-block w-100"
                                  alt="..."
                                />
                              </div>
                            </Link>
                          );
                        } else {
                          return (
                            <Link
                              to={`/films/${simi.id_imdb}`}
                              className="carousel-item"
                            >
                              <div>
                                <img
                                  src={`https://image.tmdb.org/t/p/w300/${simi.image}`}
                                  className="d-block w-100"
                                  alt="..."
                                />
                              </div>
                            </Link>
                          );
                        }
                      })}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
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
  } else {
    return <h1>Loading</h1>;
  }
};

export default FilmPage;
