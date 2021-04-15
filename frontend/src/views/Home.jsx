import "../css/home.css";
import CarouselMain from "../components/CarouselMain";
import "../css/carousel.css";
import '../css/catalog.css'

function Home() {
  return (
    <div >
      <h2 className="m-3">Popular Movies</h2>
      <CarouselMain/>
    </div>
  );
}

export default Home;
