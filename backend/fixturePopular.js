const request = require("request");
const PopularModel = require("./models/Popular");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/w2w", () => {
    console.log("connecté");
});

const createFilms = async () => {
    await PopularModel.deleteMany({}).exec();
    const searchPopularMovies = request(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=efd8a07427b2c721a89376dbc34799dd`,
        async function (error, response, body) {
            console.error("error searchMovies:", error); // Print the error if one occurred
            console.log(
                "statusCode searchMovies:",
                response && response.statusCode
            ); // Print the response status code if a response was received
            body = JSON.parse(body);
            
            const popularList = await body.results.map((film) => {
                return {
                    id_imdb: film.id,
                    image: film.poster_path,
                };
            });

            await PopularModel.create(popularList);
        }
    );
}

const tkt = async () => {
    createFilms();
};

tkt();