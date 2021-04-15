import { useEffect, useState } from "react";
import "../css/catalog.css";
import { Link } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Catalog = () => {
  const [platformFilterValue, setPlatformFilterValue] = useState();
  const [genreFilterValue, setGenreFilterValue] = useState();
  const [films, setfilms] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filmsSearch, setFilmsSearch] = useState("");
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [page, setPage] = useState(0);

  const fetchfilms = () => {
    fetch(`http://localhost:8000/home?limit=100&offset=${page}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        platform: platformFilterValue,
        genres: genreFilterValue,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setNumberOfPage(Math.floor(response.count/ 100));
        setfilms(response.films);
      });
  };

  useEffect(() => {
    if (!searchValue) {
      setfilms();
      fetchfilms();
    } else {
      searchBarResult();
    }
  }, [searchValue, page]);

  function tkt(e) {
    e.preventDefault();
    fetchfilms();
  }
  const checkGenreFilter = (type) => {
    console.log(type);
    setGenreFilterValue(type);
  };

  const checkFilter = (type) => {
    console.log(type);
    setPlatformFilterValue(type);
  };

  const searchBarResult = () => {
    fetch(`http://localhost:8000/films/moovice/search/${searchValue}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setFilmsSearch(response.films);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const previousPage = () => {
    if (page >= 100) {
      setPage(page - 100);
    }
  };
  const nextPage = () => {
    setPage(page + 100);
  };

  const paginationItem = () => {
    const pages = [];
    for (let i = 0; i < numberOfPage; i++) {
      pages.push(
        <li class="page-item">
          <button class="page-link" onClick={() => setPage(i * 100)}>
            {i + 1}
          </button>
        </li>
      );
    }

    return pages;
  };

  if (searchValue) {
    return (
      <>
        <div className="container-fluid">
          <div className=" d-flex justify-content-center titleCatalog">
            <h2>Catalog</h2>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="col-10">
                <div className="input-group mb-3 ">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="search"
                    className="form-control"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-evenly filterCatalog">
              <div className="heightFit">
                <PlatformFilter checkFilter={checkFilter}></PlatformFilter>
              </div>
              <div className="heightFit">
                <GenreFilter checkGenreFilter={checkGenreFilter}></GenreFilter>
              </div>

              <button className="btn searchButton" onClick={tkt}>
                Filter
              </button>
            </div>

            <div className="d-flex justify-content-center ">
              <div className="col-10 d-flex justify-content-center flex-wrap sibling-fade">
                {filmsSearch ? (
                  filmsSearch.slice(0, 100).map((item, key) => (
                    <Link key={key} to={`/films/${item.id_imdb}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${item.image}`}
                        alt=""
                        className="filmDispo"
                      />
                    </Link>
                  ))
                ) : (
                  <div className=" d-flex justify-content-center loader">
                    <Loader
                      type="Circles"
                      color="#f0f8ff "
                      height={100}
                      width={100}
                      timeout={10000}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
       <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button
                class="page-link"
                aria-label="Previous"
                onClick={previousPage}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {paginationItem()}
            <li class="page-item">
              <button class="page-link" aria-label="Next" onClick={nextPage}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className=" d-flex justify-content-center titleCatalog">
            <h2>Catalog</h2>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="col-10">
                <div className="input-group mb-3 ">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="search"
                    className="form-control"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-evenly filterCatalog">
              <div className="heightFit">
                <PlatformFilter checkFilter={checkFilter}></PlatformFilter>
              </div>
              <div className="heightFit">
                <GenreFilter checkGenreFilter={checkGenreFilter}></GenreFilter>
              </div>
              <button className="btn searchButton" onClick={tkt}>
                Filter
              </button>
            </div>

            <div className="d-flex justify-content-center">
              <div className="col-10 d-flex justify-content-center flex-wrap sibling-fade">
                {films ? (
                  films.slice(0, 100).map((item, key) => (
                    <Link key={key} to={`/films/${item.id_imdb}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${item.image}`}
                        alt=""
                        className="filmDispo"
                      />{" "}
                    </Link>
                  ))
                ) : (
                  <div className=" d-flex justify-content-center loader">
                    <Loader
                      type="Circles"
                      color="#f0f8ff"
                      height={100}
                      width={100}
                      timeout={10000}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
       
      </>
    );
  }
};

export default Catalog;
