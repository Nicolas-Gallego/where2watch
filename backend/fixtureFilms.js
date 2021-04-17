const request = require("request");
const FilmModel = require("./models/Film");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/w2w",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connecté");
  }
);

const apiKey = "efd8a07427b2c721a89376dbc34799dd";

const createFilms = async () => {
  await FilmModel.deleteMany({}).exec();
  for (let i = 1; i <= 500; i++) {
    const searchPopularMovies = request(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${i}`,
      async function (error, response, body) {
        console.error("error searchMovies:", error); // Print the error if one occurred
        console.log(
          "statusCode searchMovies:",
          response && response.statusCode
        ); // Print the response status code if a response was received
        body = JSON.parse(body);

        const filmList = await body.results.map((film) => {
          return {
            id_imdb: film.id,
            titre: film.original_title,
            image: film.poster_path,
            description: film.overview,
            date: film.release_date,
            langue: film.original_language,
            genres: film.genre_ids,
            note: film.vote_average,
          };
        });

        await FilmModel.create(filmList);
      }
    );
  }
};

const addSimilarsFilms = async () => {
  const myFilms = await FilmModel.find({});

  await myFilms.map((myfilm) => {
    request(
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/similar?api_key=${apiKey}`,
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
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/watch/providers?api_key=${apiKey}`,
      async function (error, response, content) {
        console.log(
          "statusCode search Platform:",
          response && response.statusCode
        ); // Print the response status code if a response was received
        let PlatformByFilms = JSON.parse(content);
        let platforms = PlatformByFilms.results.FR.flatrate.map((item) => {
          return item.provider_name;
        });
        await myfilm.updateOne({ platforme: platforms });
      }
    );
  });
};

const addCastFilms = async () => {
  const myFilms = await FilmModel.find({});

  await myFilms.map((myfilm) => {
    request(
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/credits?api_key=${apiKey}`,
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

const addDirectorFilms = async () => {
  const myFilms = await FilmModel.find({});

  await myFilms.map((myfilm) => {
    request(
      `https://api.themoviedb.org/3/movie/${myfilm.id_imdb}/credits?api_key=${apiKey}&`,
      async function (error, response, content) {
        console.error("error search Director:", error); // Print the error if one occurred
        console.log(
          "statusCode search Director:",
          response && response.statusCode
        ); // Print the response status code if a response was received
        directeursByFilms = JSON.parse(content);
        directeurs = directeursByFilms.crew
          .filter((dir) => {
            return dir.job === "Director";
          })
          .map((director) => {
            return {
              nom: director.name,
              role: director.department,
            };
          });
        await myfilm.updateOne({ directeurs: directeurs });
      }
    );
  });
};

const addGenreFilms = async () => {
  request(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    async function (error, response, content) {
      console.error("error search genres:", error); // Print the error if one occurred
      console.log("statusCode search genres:", response && response.statusCode); // Print the response status code if a response was received
      catégories = JSON.parse(content);
      const myFilms = await FilmModel.find({});
      myFilms.map((film) => {
        let test = [];
        for (let i = 0; i < film.genres.length; i++) {
          let findGenre = catégories.genres.find(
            (el) => el.id == film.genres[i]
          );
          test.push(findGenre.name);
        }
        film.genres = test;
        film.save();
      });
    }
  );
};

const removeFilmsForPlatformsNotFind = async () => {
  const filmsPlatNotFind = await FilmModel.find({
    platforme: { $in: "pas trouvé" },
  }).deleteMany();
};

const getTranslation = async () => {
  const filmNotEn = await FilmModel.find({ langue: { $ne: "en" } });

  await filmNotEn.map((movie) => {
    request(
      `https://api.themoviedb.org/3/movie/${movie.id_imdb}/translations?api_key=${apiKey}`,
      async function (error, response, content) {
        translationMovie = JSON.parse(content);
        const translatation = translationMovie.translations.find((movie) => {
          return movie.iso_3166_1 === "US";
        });
        await movie.updateOne({
          description: translatation.data.overview,
          titre: translatation.data.title,
        });
      }
    );
  });
};

const CreateMyFilms = async () => {
  // createFilms();

  // setTimeout(() => {
  //   addPlatformFilms();
  // }, 1000);

  // removeFilmsForPlatformsNotFind();

  // setTimeout(() => {
  //   getTranslation();
  // }, 1000);

  // setTimeout(() => {
  //   addGenreFilms();
  // }, 1000);

  // setTimeout(() => {
  //   addDirectorFilms();
  // }, 1000);

  // setTimeout(() => {
  //   addCastFilms();
  // }, 1000);

  // setTimeout(() => {
  //   addSimilarsFilms();
  // }, 1000);

};

CreateMyFilms();
