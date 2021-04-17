import { useEffect, useState } from "react";
import "../css/catalog.css";
import { Link } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";
import SearchBar from "../components/SearchBar";
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
    fetch(`http://localhost:8000/home?limit=20&page=${page}`, {
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
    setGenreFilterValue(type);
  };

  const checkFilter = (type) => {
    setPlatformFilterValue(type);
  };

  const searchBarResult = () => {
    fetch(`http://localhost:8000/films/moovice/search/${searchValue}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setFilmsSearch(response.films);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const previousPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page === numberOfPage) {
      return;
    } else {
      setPage(page + 1);
      window.scrollTo({top: 300, behavior: 'smooth'});
    }
  };

  const paginationItem = () => {
    const pages = [];
    for (
      let i = Math.max(0, page - 2);
      i < Math.min(numberOfPage + 1, Math.max(5, page + 3));
      i++
    ) {
      if (i === page) {
        pages.push(
          <li className="page-item">
            <button
              className="page-link is-active"
              onClick={() => setPage(i * 1)}
            >
              {i + 1}
            </button>
          </li>
        );
      } else {
        pages.push(
          <li className="page-item">
            <button className="page-link" onClick={() => setPage(i * 1)}>
              {i + 1}
            </button>
          </li>
        );
      }
    }
    return pages;
  };

  if (searchValue) {
    return (
      <>
        <div className="container-fluid">
          <div className=" d-flex justify-content-center titleCatalog"></div>
          <div className="row d-flex">
            <div className="d-flex justify-content-center">
              <div className="col-10">
                <h3 className="secondTitle">
                  {" "}
                  Corresponding movies for: {searchValue}
                </h3>
                <div className="input-group mb-3">
                  <div class="search-box">
                    <input
                      type="text"
                      // className="form-control"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <i id="icon" class="search"></i>
                  </div>
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
              <div className="heightFit">
                <button className="btn  searchButton" onClick={tkt}>
                  Filter
                </button>
              </div>
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
        <div className="container-fluid">
          <div className=" d-flex justify-content-center titleCatalog"></div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="col-10">
                <h3 className="secondTitle"> Search for a movie</h3>
                <div className="input-group mb-3">
                  <div class="search-box">
                    <input
                      type="search"
                      // className="form-control"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <i id="icon" class="search"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-evenly filterCatalog">
              <div className="heightFit shadowFilter">
                <PlatformFilter checkFilter={checkFilter}></PlatformFilter>
              </div>
              <div className="heightFit shadowFilter">
                <GenreFilter checkGenreFilter={checkGenreFilter}></GenreFilter>
              </div>
              <div className="heightFit">
                <button className="btn  searchButton" onClick={tkt}>
                  Filter
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-center moviesContainer">
              <div className="col-10 d-flex justify-content-center flex-wrap sibling-fade">
                {films ? (
                  films.map((item, key) => (
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
            <nav aria-label="Page navigation example">
              <ul className="pagination ">
                <li className="page-item">
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={previousPage}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {paginationItem()}
                <li className="page-item">
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={nextPage}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
};

export default Catalog;
