import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class CarouselMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }
  componentDidMount() {
    this.loadMovies();
  }
  loadMovies() {
    fetch(`http://localhost:8000/films/moovice`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          movies: response.films,
        });
      });
  }
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    if (this.state.movies) {
      return (
        <div>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-0-px"
          >
            {this.state.movies.slice(0, 15).map((movie) => {
              return (
                <Link to={`/films/${movie.id_imdb}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.image}`}
                    alt="..."
                    className='posterCarousel'
                  />
                </Link>
              );
            })}
          </Carousel>
        </div>
      );
    } else {
      return  <div className=" d-flex justify-content-center loader">
      <Loader
        type="Circles"
        color="#F0F8FF"
        height={100}
        width={100}
        timeout={10000}
      />
    </div>
    }
  }
}
