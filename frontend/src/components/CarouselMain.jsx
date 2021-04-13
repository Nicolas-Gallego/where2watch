import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

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
    console.log("load movies");
    fetch(`http://localhost:8000/films/moovice`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          movies: response.films,
        });
        console.log(response);
      });
  }

  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
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
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-0-px"
            // className="carousel"
          >
            {this.state.movies.map((movie) => {
              return (
                <Link to={`/films/${movie.id_imdb}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.image}`}
                    alt="..."
                  />
                </Link>
              );
            })}
          </Carousel>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}
