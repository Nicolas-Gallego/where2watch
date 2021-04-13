import '../css/home.css'
import GenreFilter from "../components/GenreFilter";
import PlatformFilter from "../components/PlatformFilter";
import CarouselMain from '../components/CarouselMain'
import '../css/carousel.css'
import {useEffect} from 'react'


function Home() {

  const fetchfilms = ()=>{
    fetch(`http://localhost:8000/films/cat=netflix`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }

  useEffect(() => {
    fetchfilms()
  }, [])


  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <h1 className='mainTitle'>Where 2 Watch</h1>
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
              <PlatformFilter></PlatformFilter>
              <button className="btn searchButton">Search</button>
            </div>
          </form>
        </div>
      </div>
      <div >
      <CarouselMain/>
      </div>
    </div>
  );
}

export default Home;
