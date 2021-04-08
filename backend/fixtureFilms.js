const request = require("request");
const FilmModel = require("./models/Film");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/w2w", () => {
  console.log("connecté");
});

const createFilms = async () => {
  const searchPopularMovies = request(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=efd8a07427b2c721a89376dbc34799dd",
    async function (error, response, body) {
      console.error("error searchMovies:", error); // Print the error if one occurred
      console.log("statusCode searchMovies:", response && response.statusCode); // Print the response status code if a response was received
      body = JSON.parse(body);
      await FilmModel.deleteMany({}).exec();
      const filmList = await body.results.map((film) => {
        return {
          id_imdb: film.id,
          titre: film.original_title,
          image: film.poster_path,
          description: film.overview,
          langue: film.original_language,
        };
      });
      await FilmModel.create(filmList);
    }
  );
};

const addSimilarsFilms = async () => {
  const myFilms = await FilmModel.find({});

  await myFilms.map((myfilm) => {
    request(
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/similar?api_key=efd8a07427b2c721a89376dbc34799dd`,
      async function (error, response, content) {
        console.error("error search similars:", error); // Print the error if one occurred
        console.log(
          "statusCode search similars:",
          response && response.statusCode
        ); // Print the response status code if a response was received
        films = JSON.parse(content);
        const similars = films.results.map((item) => {
          return {
            id_imdb: item.id,
            titre: item.original_title,
            description: item.overview,
            image: item.poster_path,
          };
        });
        await myfilm.updateOne({ similars: similars });
      }
    );
  });
};

const addPlatformFilms = async () => {
  const myFilms = await FilmModel.find({});

  await myFilms.map((myfilm) => {
    request(
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/watch/providers?api_key=efd8a07427b2c721a89376dbc34799dd`,
      async function (error, response, content) {
        console.error("error search Platform:", error); // Print the error if one occurred
        console.log(
          "statusCode search Platform:",
          response && response.statusCode
        ); // Print the response status code if a response was received
        PlatformByFilms = JSON.parse(content);
        platforms = PlatformByFilms.results.FR.flatrate.map((item) => {
          return item.provider_name;
        });
        await myfilm.updateOne({ platforme: platforms });
      }
    );
  });
};

const addCreditsFilms = async () => {
  const myFilms = await FilmModel.find({});

  await myFilms.map((myfilm) => {
    request(
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/credits?api_key=efd8a07427b2c721a89376dbc34799dd&language=fr-FR`,
      async function (error, response, content) {
        console.error("error search Casting:", error); // Print the error if one occurred
        console.log(
          "statusCode search Casting:",
          response && response.statusCode
        ); // Print the response status code if a response was received
        CastingByFilms = JSON.parse(content);
        casting = CastingByFilms.cast.map((item) => {
          return {
            nom: item.name,
            personnage: item.character,
            role: item.known_for_department,
            image: item.profile_path,
          };
        });
        await myfilm.updateOne({ casting: casting });
      }
    );
  });
};

const tkt = async () => {

  createFilms();
  setTimeout(() => {
    addSimilarsFilms();
    addPlatformFilms();
    addCreditsFilms();
  }, 2000);
};

tkt();

// plateform : film.flatrate ? film.flatrate.map((plat) => {return plat.provider_name}) : "pas trouvé",

// id_imdb: String,
// titre: String,
// image: String,
// description: String,
// platforme: [String],
// casting: [
//   {
//     nom: String,
//     prénom: String,
//     image: String,
//   },
// ],
// langue: String,
// note: Number,
// duree: String,
// similars: [
//   {
//     nom: String,
//     prénom: String,
//     image: String,
//   },
// ],
