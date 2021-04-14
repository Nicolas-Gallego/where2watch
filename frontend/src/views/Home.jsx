import "../css/home.css";
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";
import CarouselMain from "../components/CarouselMain";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../css/carousel.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [platformFilterValue, setPlatformFilterValue] = useState([]);
  const [films, setfilms] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [test, setTest] = useState("");

  const fetchfilms = () => {
    fetch(`http://localhost:8000/home`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cat: platformFilterValue,
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
    if (films) {
      return;
    } else {
      fetchfilms();
    }
  }, [films, searchValue]);

  useEffect(() => {
    searchBarResulut();
  }, [searchValue]);

  function tkt(e) {
    fetchfilms();
    e.preventDefault();
  }

  const checkFilter = (data) => {
    setPlatformFilterValue(data);
  };

  const searchBarResulut = () => {
    console.log(searchValue);
    if (searchValue) {
      fetch(`http://localhost:8000/films/moovice/${searchValue}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setTest(response);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <form>
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
            <div className="d-flex flex-row justify-content-evenly filter">
              <GenreFilter></GenreFilter>
              <PlatformFilter checkFilter={checkFilter}></PlatformFilter>
              <button className="btn searchButton" onClick={tkt}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <CarouselMain />
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {films ? (
          films.slice(0, 100).map((item) => (
            <Link to={`/films/${item.id_imdb}`}>
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
              color="#000000"
              height={100}
              width={100}
              timeout={20000}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
