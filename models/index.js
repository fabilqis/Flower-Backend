const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Flowerschema = new Schema({
  name: String,
  description: String
});

let Models = mongoose.model("flower", Flowerschema, "flower", true);
module.exports.Models = Models;