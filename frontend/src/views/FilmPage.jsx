import NavbarUnregistered from "../components/NavbarUnregistered";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/filmPage.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const FilmPage = ({ match }) => {
  const [filmInfos, setFilmInfos] = useState("");
  const [filmId, setFilmId] = useState(match.params.id);

  useEffect(() => {
    searchFilmInfos();
  }, [filmId]);

  useEffect(()=> {
    setFilmId(match.params.id)
  }, [match.params.id]);
  
  const searchFilmInfos = () => {
    fetch(`http://localhost:8000/films/moovice/${filmId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setFilmInfos(response.film);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const platformLink = (platform) => {
    if (platform === "Disney Plus") {
      return "https://www.disneyplus.com/fr-fr/home";
    } else if (platform === "Netflix") {
      return "https://www.netflix.com/browse";
    } else if (platform === "Canal+") {
      return "https://www.canalplus.com//";
    } else if (platform === "Amazon Prime Video") {
      return "https://www.primevideo.com/";
    } else if (platform === "La Cinetek") {
      return "https://www.lacinetek.com/fr/";
    } else if (platform === "OCS Go") {
      return "https://www.ocs.fr//";
    } else if (platform === "Anime Digital Networks") {
      return "https://animedigitalnetwork.fr/";
    } else {
      return "#";
    }
  };

  if (filmInfos) {
    return (
      <>
        <div>
          <div className="container-fluid p-3">
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
                <div className=" d-flex justify-content-start">
                  {filmInfos.platforme.map((platforme) => {
                    if (platforme === "pas trouvé") {
                      <span>Pas trouvé</span>;
                    } else {
                      return (
                        <a href={platformLink(platforme)} target={"blank"}>
                          <img
                            className="logoPlatform"
                            src={`/${platforme}.png`}
                          />
                        </a>
                      );
                    }
                  })}
                </div>
                <div>
                  <span>
                    <h6>Release date</h6>
                    {filmInfos.date}
                  </span>
                </div>
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
               {filmInfos.similars.length > 0 && <div className="other">
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
                              <div onClick={() => setFilmId(simi.id_imdb)}>
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
                              <div onClick={() => setFilmId(simi.id_imdb)}>
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
                </div> }
              </div>
            </div>
            <div className="container2"></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className=" d-flex justify-content-center loader">
        <Loader
          type="Circles"
          color="#F0F8FF"
          height={100}
          width={100}
          timeout={10000}
        />
      </div>
    );
  }
};

export default FilmPage;
