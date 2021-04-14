import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";

const Catalog = () => {
  const [platformFilterValue, setPlatformFilterValue] = useState([]);
  const [genreFilterValue, setGenreFilterValue] = useState([]);
  const [films, setfilms] = useState("");
  const [searchValue, setSearchValue] = useState("");


  const fetchfilms = () => {
    fetch(`http://localhost:8000/home`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cat: platformFilterValue ? platformFilterValue : 0,
        genres: genreFilterValue ? genreFilterValue : 0,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setfilms(response.films);
      });
  };

  useEffect(() => {
    if (films) {
      return;
    } else {
      fetchfilms();
    }
    searchBarResulut()
  }, [films, searchValue]);

  function tkt(e) {
    fetchfilms();
    e.preventDefault();
  }
  const checkGenreFilter = (type) => {
    setGenreFilterValue(type);
  };

  const checkFilter = (data) => {
    setPlatformFilterValue(data);
  };

  const searchBarResulut = () => {
    console.log(searchValue)
    if (searchValue) {
      fetch(`http://localhost:8000/films/moovice/search/${searchValue}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        }).catch((err) => {
          console.log(err)
        })
    }
  };


  return (
    <>
      <div className="container-fluid">
        <div className=" d-flex justify-content-center titleCatalog">
          <h2>catalog</h2>
        </div>
        <div className="row">
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
          <div className="d-flex flex-row justify-content-evenly filterCatalog">
            <GenreFilter checkGenreFilter={checkGenreFilter}></GenreFilter>
            <PlatformFilter checkFilter={checkFilter}></PlatformFilter>
            <button className="btn searchButton" onClick={tkt}>
              Filter
            </button>
          </div>

          <div className="d-flex justify-content-center flex-wrap">
            {films ? (
              films.slice(0, 20).map((item) => (
                <Link to={`/films/${item.id_imdb}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${item.image}`}
                    alt=""
                    className="filmDispo"
                  />{" "}
                </Link>
              ))
            ) : (
              <h1>LOADING</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
