const mongoose = require("mongoose");

// create the collection for Services
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
  company: String,
  address: String,
  name: String,
  description: String,
  tags: Array,
  times: Array,
  phone: String,
  date: Date
});

const Services = mongoose.model("Services", ServiceSchema);

module.exports = Services;
