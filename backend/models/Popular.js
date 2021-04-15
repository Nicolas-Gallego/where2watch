const mongoose = require("mongoose");

const popularSchema = new mongoose.Schema({
  id_imdb: String,
  image: String,
});

const PopularModel = mongoose.model("Popular", popularSchema);

module.exports = PopularModel;
