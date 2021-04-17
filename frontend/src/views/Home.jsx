import "../css/home.css";
import {useEffect} from "react"
import CarouselMain from "../components/CarouselMain";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import "../css/carousel.css";
import "../css/catalog.css";

function Home() {
  useEffect(() => {
  
    
  }, [])
  return (
    <div>
      <h2 className="m-3">Popular Movies</h2>
      <CarouselMain />
    </div>
  );
}

export default Home;
