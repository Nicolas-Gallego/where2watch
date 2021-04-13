import "../css/home.css";
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";
import CarouselMain from "../components/CarouselMain";
import "../css/carousel.css";
import { useEffect, useState } from "react";

function Home() {
  const [platformFilterValue, setPlatformFilterValue] = useState([]);

  const fetchfilms = () => {
    console.log(`http://localhost:8000/home/${platformFilterValue}`)
    fetch(`http://localhost:8000/home/${platformFilterValue}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    console.log(platformFilterValue);
  }, [platformFilterValue]);

  function tkt (e) {
    fetchfilms();
    e.preventDefault();
  };

  const checkFilter = (data) => {
    setPlatformFilterValue(data);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <h1 className="mainTitle">Where 2 Watch</h1>
          <form>
            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                <i class="fas fa-search"></i>
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
    </div>
  );
}

export default Home;
