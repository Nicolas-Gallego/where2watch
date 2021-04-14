import "../css/home.css";
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";
import CarouselMain from "../components/CarouselMain";
import "../css/carousel.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [platformFilterValue, setPlatformFilterValue] = useState([]);
  const [films, setfilms] = useState("");

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
        console.log(response);
        setfilms(response.films);
      });
  };

  useEffect(() => {
    if (films) {
      return;
    } else {
    }
  }, [films]);

  function tkt(e) {
    fetchfilms();
    e.preventDefault();
  }

  const checkFilter = (data) => {
    setPlatformFilterValue(data);
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
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="d-flex flex-row justify-content-evenly">
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
      <div>
        {films ? (
          films.slice(0, 100).map((item) => (
            <Link key={item} to={`/films/${item.id_imdb}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${item.image}`}
                alt=""
              />{" "}
            </Link>
          ))
        ) : (
          <h1>LOADING</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
