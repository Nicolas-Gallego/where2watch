const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  id_imdb: String,
  titre: String,
  image: String,
  description: String,
  //   platforme: [],
  platforme: {
    type: [String],
    default: ["pas trouvé"],
  },
  casting: [
    {
      nom: String,
      personnage: String,
      role: String,
      image: String,
    },
  ],
  directeurs: [
    {
      nom: String,
      role: String,
    },
  ],
  langue: String,
  note: Number,
  duree: String,
  similars: [
    {
      id_imdb: String,
      titre: String,
      description: String,
      image: String,
    },
  ],
});

const FilmModel = mongoose.model("Film", filmSchema);

module.exports = FilmModel;
