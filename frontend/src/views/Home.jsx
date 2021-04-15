import "../css/home.css";
import CarouselMain from "../components/CarouselMain";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import "../css/carousel.css";
import '../css/catalog.css'

function Home() {
  return (
    <div>
      <ScrollAnimation animteIn="fadeIn">
      <h2 className="m-3">Popular Movies</h2>
      </ScrollAnimation>
      <CarouselMain/>
    </div>
  );
}

export default Home;
