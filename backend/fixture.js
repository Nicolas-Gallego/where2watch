const request = require("request");
const FilmModel = require("./models/Film");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/w2w", () => {
  console.log("connecté");
});

request(
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=efd8a07427b2c721a89376dbc34799dd",
  async function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    body = JSON.parse(body);
      await FilmModel.deleteMany({}).exec();
      await body.results.map((film) => {
        FilmModel.create({
         titre: film.original_title,
         image: film.poster_path,
         description: film.overview,
         langue: film.original_language
       });
     })
  }
);
