const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
   titre : String,
   image : String,
   description : String,
   langue : String,
});
const FilmModel = mongoose.model('Film', filmSchema);

module.exports = FilmModel;